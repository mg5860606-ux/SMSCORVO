const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const Payment = require('../models/Payment');
const User = require('../models/User');

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, plan_id, user_email } = req.body;

    // Calculate bonus
    let bonus_percentage = 0;
    if (plan_id === 'popular') bonus_percentage = 10;
    if (plan_id === 'premium') bonus_percentage = 20;

    const final_amount = amount + (amount * bonus_percentage / 100);

    // Create Stripe PaymentIntent
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'brl',
      payment_method_types: ['card'],
      metadata: {
        plan_id,
        user_email,
        bonus_percentage: bonus_percentage.toString(),
        final_amount: final_amount.toString()
      }
    });

    // Save payment record
    await Payment.create({
      payment_intent_id: intent.id,
      user_email,
      amount,
      bonus_percentage,
      final_amount,
      plan_id,
      status: 'pending',
      created_at: new Date()
    });

    res.json({
      client_secret: intent.client_secret,
      payment_intent_id: intent.id
    });

  } catch (error) {
    console.error('Erro no pagamento:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhook', async (req, res) => {
  try {
    const event = req.body;

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;

      // Update payment record
      await Payment.updateOne(
        { payment_intent_id: paymentIntent.id },
        { 
          status: 'completed',
          completed_at: new Date()
        }
      );

      // Update user balance
      const metadata = paymentIntent.metadata;
      const user_email = metadata.user_email;
      const final_amount = parseFloat(metadata.final_amount);

      if (user_email && final_amount > 0) {
        const user = await User.findOne({ email: user_email });
        if (user) {
          user.balance = (user.balance || 0) + final_amount;
          await user.save();
        }
      }
    }

    res.json({ status: 'success' });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/balance/:user_email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.user_email });
    res.json({ balance: user?.balance || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

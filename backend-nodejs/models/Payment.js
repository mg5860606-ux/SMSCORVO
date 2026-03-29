const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  payment_intent_id: { type: String, required: true, unique: true },
  user_email: { type: String, required: true },
  amount: { type: Number, required: true },
  bonus_percentage: { type: Number, default: 0 },
  final_amount: { type: Number, required: true },
  plan_id: { type: String, required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  completed_at: { type: Date }
});

module.exports = mongoose.model('Payment', paymentSchema);

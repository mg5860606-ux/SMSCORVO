const express = require('express');
const axios = require('axios');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');

router.post('/chat', async (req, res) => {
  try {
    const { message, session_id } = req.body;
    const sessionId = session_id || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const apiKey = process.env.EMERGENT_LLM_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key não configurada' });
    }

    // Respostas automáticas baseadas em palavras-chave
    let responseText = '';
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('preço') || lowerMessage.includes('custa') || lowerMessage.includes('valor')) {
      responseText = 'Os preços do SMSCorvo variam por serviço e país:\n\n• WhatsApp: R$ 5,00\n• Google: R$ 2,50\n• Instagram/LinkedIn: R$ 4,50\n• Telegram/Facebook: R$ 3,00-3,50\n\nOs preços também variam conforme o país selecionado! 🌍';
    } else if (lowerMessage.includes('funciona') || lowerMessage.includes('como usar')) {
      responseText = 'O SMSCorvo é muito simples! 😊\n\n1. Faça login ou crie uma conta\n2. Adicione créditos (mínimo R$5)\n3. Escolha o serviço e país\n4. Compre o número virtual\n5. Use o número para receber o código SMS\n6. O código aparece automaticamente no painel!\n\nTemos +150 serviços compatíveis!';
    } else if (lowerMessage.includes('deposito') || lowerMessage.includes('pix') || lowerMessage.includes('crédito')) {
      responseText = 'Depósitos no SMSCorvo:\n\n💰 Planos disponíveis:\n• Básico: R$ 5 (sem bônus)\n• Popular: R$ 50 (+10% bônus = R$ 55)\n• Premium: R$ 250 (+20% bônus = R$ 300)\n\nAceitamos PIX e cartão de crédito via Stripe! ⚡';
    } else if (lowerMessage.includes('país') || lowerMessage.includes('pais')) {
      responseText = 'Temos números virtuais de 10 países! 🌍\n\n🇧🇷 Brasil\n🇺🇸 Estados Unidos\n🇬🇧 Reino Unido\n🇵🇹 Portugal\n🇷🇺 Rússia\n🇨🇳 China\n🇮🇳 Índia\n🇩🇪 Alemanha\n🇫🇷 França\n🇪🇸 Espanha\n\nCada país tem preços diferentes!';
    } else if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('hello')) {
      responseText = 'Olá! 👋 Seja bem-vindo ao SMSCorvo!\n\nSou seu assistente virtual e estou aqui para ajudar!\n\nPosso te ajudar com:\n• Explicar como funciona\n• Informar preços\n• Tirar dúvidas sobre depósitos\n• Mostrar países disponíveis\n\nComo posso te ajudar hoje?';
    } else {
      responseText = 'Desculpe, não entendi sua pergunta. 😅\n\nPosso te ajudar com:\n• Como funciona o SMSCorvo\n• Preços dos serviços\n• Depósitos e créditos\n• Países disponíveis\n\nFaça sua pergunta de forma mais específica!';
    }

    // Save conversation to database
    await ChatHistory.create({
      session_id: sessionId,
      user_message: message,
      bot_response: responseText,
      timestamp: new Date()
    });

    res.json({
      session_id: sessionId,
      response: responseText
    });

  } catch (error) {
    console.error('Erro no chat:', error.message);
    res.status(500).json({ error: 'Erro ao processar mensagem' });
  }
});

router.get('/history/:session_id', async (req, res) => {
  try {
    const messages = await ChatHistory.find({ 
      session_id: req.params.session_id 
    })
    .select('user_message bot_response timestamp')
    .sort({ timestamp: 1 })
    .limit(100);

    res.json({
      session_id: req.params.session_id,
      messages: messages.map(msg => ({
        user: msg.user_message,
        bot: msg.bot_response,
        timestamp: msg.timestamp.toISOString()
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

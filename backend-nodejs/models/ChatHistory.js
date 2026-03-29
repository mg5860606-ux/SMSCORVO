const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  session_id: { type: String, required: true, index: true },
  user_message: { type: String, required: true },
  bot_response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  picture: { type: String },
  balance: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

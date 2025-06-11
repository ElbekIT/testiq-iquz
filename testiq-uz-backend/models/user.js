const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  avatarIndex: Number,
  correct: { type: Number, default: 0 },
  wrong: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);

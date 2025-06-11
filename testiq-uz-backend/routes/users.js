const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Yangi foydalanuvchi qo‘shish
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reyting (leaderboard)
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Foydalanuvchini o‘chirish
router.delete('/delete/:name', async (req, res) => {
  try {
    await User.deleteOne({ name: req.params.name });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('user', 'username')
      .sort({ createdAt: 1 })
      .limit(100); // Limit to last 100 messages

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a message (mostly handled via socket.io, but keeping REST endpoint)
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    const message = new Message({
      user: req.user._id,
      username: req.user.username,
      text
    });

    await message.save();
    await message.populate('user', 'username');

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, phone, location } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Name, email, password required' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ status: 'error', message: 'Email already registered' });

    const user = new User({ fullName, email, passwordHash: password, phone, location });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await Session.create({ userId: user._id, token, expiresAt });

    res.status(201).json({
      status: 'success',
      data: { token, user: { id: user._id, fullName, email, phone, location, role: user.role } }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: 'error', message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ status: 'error', message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await Session.create({ userId: user._id, token, expiresAt });

    res.json({
      status: 'success',
      data: { token, user: { id: user._id, fullName: user.fullName, email, phone: user.phone, location: user.location, role: user.role } }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Login failed' });
  }
});

router.post('/logout', authMiddleware, async (req, res) => {
  await Session.deleteOne({ token: req.token });
  res.json({ status: 'success', message: 'Logged out' });
});

router.get('/me', authMiddleware, async (req, res) => {
  res.json({ status: 'success', data: req.user });
});

module.exports = router;
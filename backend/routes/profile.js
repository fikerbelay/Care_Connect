const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select('-passwordHash');
  res.json({ status: 'success', data: user });
});

router.put('/', authMiddleware, async (req, res) => {
  const { fullName, phone, location, bio } = req.body;
  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (phone !== undefined) updates.phone = phone;
  if (location !== undefined) updates.location = location;
  if (bio !== undefined) updates.bio = bio;

  const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-passwordHash');
  res.json({ status: 'success', message: 'Profile updated', data: user });
});

router.post('/change-password', authMiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ status: 'error', message: 'Current password and new password (min 6 chars) required' });
  }

  const user = await User.findById(req.user._id);
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) return res.status(401).json({ status: 'error', message: 'Current password is incorrect' });

  user.passwordHash = newPassword;
  await user.save();
  res.json({ status: 'success', message: 'Password updated' });
});

module.exports = router;
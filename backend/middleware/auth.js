const jwt = require('jsonwebtoken');
const Session = require('../models/Session');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const session = await Session.findOne({ token, userId: decoded.userId });
    if (!session) return res.status(401).json({ status: 'error', message: 'Session expired' });

    const user = await User.findById(decoded.userId).select('-passwordHash');
    if (!user) return res.status(401).json({ status: 'error', message: 'User not found' });

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ status: 'error', message: 'Admin access required' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
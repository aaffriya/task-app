'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });     }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });     }

    req.user = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });   }
};

module.exports = auth;


const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });
    console.log(`User from DB: ${user ? user.dataValues : 'Not Found'}`);

    if (!user) {
      console.error(`User with ID ${decoded.userId} not found`);
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: 'Token is not valid' });
  }
};


module.exports = authenticateToken;

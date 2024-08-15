
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log(`Token received: ${token}`);  // Logging the token for debugging
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Decoded token: `, decoded); 
    // req.user = await User.findById(decoded.userId).select('-password');
    // next();

    const user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });
    console.log(`User from DB: ${user ? user.dataValues : 'Not Found'}`);
    // req.user = user;
    if (!user) {
        console.error(`User with ID ${decoded.userId} not found`);
        return res.status(404).json({ error: 'User not found' });
    }
    req.user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password'] } });
    // if (!req.user) {
    //   return res.status(404).json({ error: 'User not found' });
    // }
    req.user = user;
    next();
  } catch (error) {
    // res.status(401).json({ error: 'Token is not valid' });
    console.error(`JWT verification error: ${error.message}`);  // Log the exact error message
    return res.status(401).send({ error: 'Token is not valid' });
  }
};


module.exports = authenticateToken;

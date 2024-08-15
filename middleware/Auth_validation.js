const { body, validationResult } = require('express-validator');

const usernameValidator = body('username')
  .notEmpty()
  .withMessage('Username is required');

const emailValidator = body('email')
  .isEmail()
  .withMessage('Please provide a valid email');

const passwordValidator = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  usernameValidator,
  emailValidator,
  passwordValidator,
  validate,
};

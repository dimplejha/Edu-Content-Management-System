const { usernameValidator, emailValidator, passwordValidator, validate } = require('../middleware/Auth_validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = [
  usernameValidator,
  emailValidator,
  passwordValidator,
  validate,
  async (req, res) => {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let DuplicateEmail = await User.findOne({ where: { email: email } });
    if (DuplicateEmail) {
      return res.status(400).send({ status: false, message: "Email already exists" });
    }

    try {
      await User.create({ username, email, password: hashedPassword });
      return res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  }
];

exports.login = [
  emailValidator,
  passwordValidator,
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send({ status: false, error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ status: false, error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).send({ status: true, user, token });
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message });
    }
  }
];

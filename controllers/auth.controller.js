const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({ username, email, password: hashedPassword });
    return res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    // return res.send.status(400).json({ message: error.message });
    console.log(error.message)
    return res.status(500).send({ message: error.message })
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //   if (!validator.isValidRequestBody(email)) {
    //     res.status(400).send({ status: false, msg: "plese pass required parameters" })
    //     return
    //   }
    //   if (!validator.isValid(email)) {
    //     res.status(400).send({ status: false, msg: "Email is required" })
    //     return
    //   }
    //   if (!validator.isRightFormatemail(email)) {
    //     return res.status(404).send({ status: false, msg: "Invalid Email" })
    //   }

    //   if (!validator.isValid(password)) {
    //     res.status(400).send({ status: false, msg: "Password is required" })
    //     return
    //   }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send({ status: false, error: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ status: false, error: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(400).send({ status: true, user, token })
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message })
  }
};
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register user
// @route   POST /api/users
// @access  Private
module.exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, password2 } = req.body;

  // inputs check
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // passwords match check
  if (password !== password2) {
    res.status(400);
    throw new Error("Passwords doesn't match");
  }

  // duplicate check
  const dupCheck = await User.findOne({ email });
  if (dupCheck) {
    res.status(400);
    throw new Error("User already exists");
  }

  // password hash
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({ username, email, password: hashPassword });

  if (user) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // inputs check
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // user data
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  // compare passwords
  const compareCheck = await bcrypt.compare(password, user.password);

  if (!compareCheck) {
    res.status(400);
    throw new Error("Password doesn't match");
  }
  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
});

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

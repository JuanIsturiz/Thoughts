const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Thought = require("../models/thoughtModel");

// @desc    Register user
// @route   POST /user/register
// @access  Private
exports.register = asyncHandler(async (req, res) => {
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
  const emailCheck = await User.findOne({ email });
  const usernameCheck = await User.findOne({ email });
  if (usernameCheck || emailCheck) {
    res.status(400);
    throw new Error("User already exists");
  }

  // password hash
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password: hashPassword,
  });

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

// @desc    Login user
// @route   POST /user/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // inputs check
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // user data
  const user = await User.findOne({ email: email.toLowerCase() });

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
    bio: user.bio,
    token: generateToken(user._id),
  });
});

// @desc    Updates user info
// @route   PUT /user/:id
// @access  Private
exports.update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { token, changes } = req.body;

  let newUser;
  if ("bio" in changes) {
    if (changes.bio.length > 100) {
      res.status(400);
      throw new Error("Your bio must be 100 characters long or less..");
    }
    newUser = await User.findByIdAndUpdate(id, changes, { new: true });
  }
  if ("password" in changes) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(changes.password, salt);
    newUser = await User.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true }
    );
  } else if ("username" in changes) {
    newUser = await User.findByIdAndUpdate(id, changes, { new: true });
    await Thought.updateMany(
      { "userInfo.id": id },
      { "userInfo.username": changes.username }
    );
  } else {
    newUser = await User.findByIdAndUpdate(id, changes, { new: true });
  }

  const user = {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    bio: newUser.bio,
    token,
  };
  res.json(user);
});

// @desc    Gets user info by id
// @route   Get /user/:id
// @access  Public
exports.getUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select({ username: 1, bio: 1 });
    res.json(user);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

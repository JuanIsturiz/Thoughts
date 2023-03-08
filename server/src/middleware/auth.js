const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;
  try {
    if (header && header.startsWith("Bearer")) {
      // get token
      token = header.split(" ")[1];
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user info
      req.user = await User.findById(decoded.id).select("-password");
      next();
    }
  } catch (err) {
    res.status(401);
    throw new Error(err.message);
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, token not found");
  }
});

module.exports = authenticate;

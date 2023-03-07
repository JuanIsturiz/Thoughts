import expressAsyncHandler from "express-async-handler";

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;
  try {
    if (header && header.startsWith("Bearer")) {
      // get token
      token = header.split(" ")[1];
      // verify token
      console.log(jwt.verify(token, process.env.JWT_SECRET));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user info
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user);
      next();
    }
  } catch (error) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, token not found");
  }
});

module.exports = authenticate;

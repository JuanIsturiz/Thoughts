const userRouter = require("express").Router();
const { register, login } = require("../controllers/userController");

// register new user
userRouter.post("/register", register);

// login user
userRouter.post("/login", login);

module.exports = userRouter;

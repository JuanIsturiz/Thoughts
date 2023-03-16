const router = require("express").Router();
const {
  register,
  login,
  update,
  getUserInfo,
} = require("../controllers/userController");

// register new user
router.post("/register", register);

// login user
router.post("/login", login);

// update user
router.put("/update/:id", update);

// get user info by id
router.get("/:id/search", getUserInfo);

module.exports = router;

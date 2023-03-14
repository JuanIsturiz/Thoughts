const router = require("express").Router();
const { register, login, update } = require("../controllers/userController");

// register new user
router.post("/register", register);

// login user
router.post("/login", login);

// update user
router.put("/update/:id", update);

module.exports = router;

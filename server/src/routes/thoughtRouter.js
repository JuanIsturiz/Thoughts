const router = require("express").Router();

const {
  getAll,
  getById,
  getByEmotion,
  addThought,
  deleteById,
  updateById,
  getByUserId,
  getByUsername,
} = require("../controllers/thoughtController");

const authenticate = require("../middleware/auth");

// get all thoughts
router.get("/", getAll);

// get thought by id
router.get("/:id", getById);

// get thought by user id
router.get("/user/:id", getByUserId);

// get get thoughts by emotion
router.get("/search/emotion", getByEmotion);

// get get thoughts by username
router.get("/search/username", getByUsername);

// add new thought
router.post("/", authenticate, addThought);

// delete thought by id
router.delete("/:id", deleteById);

// update thought by id
router.put("/:id", updateById);

module.exports = router;

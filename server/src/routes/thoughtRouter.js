const router = require("express").Router();

const {
  getFeed,
  getById,
  getByEmotion,
  addThought,
  deleteById,
  updateById,
  getByUserId,
  getByUsername,
  getLiked,
} = require("../controllers/thoughtController");

const authenticate = require("../middleware/auth");

// get all thoughts
router.get("/", getFeed);

// get thought by id
router.get("/:id", getById);

// get thought by user id
router.get("/user/:id", getByUserId);

// get liked thoughts by user
router.get("/user/:id/liked", getLiked);

// get thoughts by emotion
router.get("/search/emotion", getByEmotion);

// get thoughts by username
router.get("/search/username", getByUsername);

// add new thought
router.post("/", authenticate, addThought);

// delete thought by id
router.delete("/:id", deleteById);

// update thought by id
router.put("/:id", updateById);

module.exports = router;

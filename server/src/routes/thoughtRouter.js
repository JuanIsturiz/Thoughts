const thoughtRouter = require("express").Router();

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
const thoughtModel = require("../models/thoughtModel");

// get all thoughts
thoughtRouter.get("/", getAll);

// get thought by id
thoughtRouter.get("/:id", getById);

// get thought by user id
thoughtRouter.get("/user/:id", getByUserId);

// get get thoughts by emotion
thoughtRouter.get("/search/emotion", getByEmotion);

// get get thoughts by username
thoughtRouter.get("/search/username", getByUsername);

// add new thought
thoughtRouter.post("/", authenticate, addThought);

// delete thought by id
thoughtRouter.delete("/:id", deleteById);

// update thought by id
thoughtRouter.put("/:id", updateById);

module.exports = thoughtRouter;

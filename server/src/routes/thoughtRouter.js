const thoughtRouter = require("express").Router();

const {
  getAll,
  getById,
  getByEmotion,
  addThought,
  deleteById,
  updateById,
  getByUserId,
} = require("../controllers/thoughtController");

const authenticate = require("../middleware/auth");

// get all thoughts
thoughtRouter.get("/", getAll);

// get thought by id
thoughtRouter.get("/:id", getById);

// get thought by user id
thoughtRouter.get("/user/:id", getByUserId);

// get get thoughts by emotion
thoughtRouter.get("/:emotion", getByEmotion);

// add new thought
thoughtRouter.post("/", authenticate, addThought);

// delete thought by id
thoughtRouter.delete("/:id", deleteById);

// update thought by id
thoughtRouter.put("/:id", updateById);

module.exports = thoughtRouter;

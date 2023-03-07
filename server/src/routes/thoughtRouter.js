const thoughtRouter = require("express").Router();

const {
  getAll,
  getById,
  getByEmotion,
  addThought,
  deleteById,
  updateById,
} = require("../controllers/thoughtController");

const authenticate = require("../middlewares/authMiddleware");

// get all thoughts
thoughtRouter.get("/", getAll);

// get thought by id
thoughtRouter.get("/:id", getById);

// get get thoughts by emotion
thoughtRouter.get("/:emotion", getByEmotion);

// add new thought
thoughtRouter.post("/", authenticate, addThought);

// delete thought by id
thoughtRouter.delete("/:id", deleteById);

// update thought by id
thoughtRouter.put("/:id", updateById);

module.exports = thoughtRouter;

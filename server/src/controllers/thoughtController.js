import expressAsyncHandler from "express-async-handler";
const Thought = require("../models/thoughtModel");

exports.getAll = expressAsyncHandler(async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.getById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const thoughts = await Thought.findById(id);
    res.json({ thoughts });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.getByEmotion = expressAsyncHandler(async (req, res) => {
  const { emotion } = req.params;

  try {
    const thoughts = await Thought.find({ emotion });
    res.json({ thoughts });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.addThought = expressAsyncHandler(async (req, res) => {
  const { text, emotion } = req.body;
  const userId = req.user.id;

  if (!text) {
    res.status(400);
    throw new Error("Please add text to thought");
  }
  if (!userId) {
    res.status(400);
    throw new Error("Invalid user");
  }

  try {
    const newThought = await Thought.create({ text, emotion, userId });
    res.status(201).json({
      id: newThought._id,
      text: newThought.text,
      emotion: newThought.emotion,
      userId,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.deleteById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Thought.findByIdAndDelete(id);
    res.json({ id });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.updateById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, action } = req.body;

  if (action === "like") {
    await Thought.findByIdAndUpdate(id, { $push: { likes: { userId } } });
    res.json({ id, userId });
  }

  if (action === "unlike") {
    await Thought.findByIdAndUpdate(id, { $pull: { likes: { userId } } });
    res.json({ id, userId });
  }

  try {
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

const asyncHandler = require("express-async-handler");
const Thought = require("../models/thoughtModel");

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.getById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const thoughts = await Thought.findById(id);
    res.json({ thoughts });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.getByEmotion = asyncHandler(async (req, res) => {
  const { emotion } = req.params;

  try {
    const thoughts = await Thought.find({ emotion });
    res.json({ thoughts });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.addThought = asyncHandler(async (req, res) => {
  console.log("add thought controller!");
  const { text, emotion, userId, username } = req.body;
  console.log(req.body);
  if (!text) {
    res.status(400);
    throw new Error("Please add text to thought");
  }
  if (!userId) {
    res.status(400);
    throw new Error("Invalid user");
  }

  try {
    const newThought = await Thought.create({
      text,
      emotion,
      userInfo: { id: userId, username },
    });
    console.log(newThought);
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500);
    console.log("ERROR!!!");
    throw new Error(err.message);
  }
});

exports.deleteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Thought.findByIdAndDelete(id);
    res.json({ id });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.updateById = asyncHandler(async (req, res) => {
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

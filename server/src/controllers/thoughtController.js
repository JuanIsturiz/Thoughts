const asyncHandler = require("express-async-handler");
const Thought = require("../models/thoughtModel");

exports.getAll = asyncHandler(async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ createdAt: -1 });
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

exports.getByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const thoughts = await Thought.find({ "userInfo.id": id });
    res.json(thoughts);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.getByEmotion = asyncHandler(async (req, res) => {
  const multiple = req.query.multiple === "true";
  try {
    const thoughts = [];
    if (!multiple) {
      const innerThoughts = await Thought.find({ emotion: req.query.emotion });
      thoughts.push(...innerThoughts);
    } else {
      for (const emotion of req.query.emotion) {
        const innerThoughts = await Thought.find({ emotion });
        thoughts.push(...innerThoughts);
      }
    }
    res.json(thoughts);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.getByUsername = asyncHandler(async (req, res) => {
  const { username } = req.query;
  try {
    const thoughts = await Thought.find({ "userInfo.username": username });
    res.json(thoughts);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.addThought = asyncHandler(async (req, res) => {
  const { text, emotion, userId, username } = req.body;
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
      createdAt: new Date(),
      userInfo: { id: userId, username },
    });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.deleteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await Thought.findByIdAndDelete(id);
    res.send(id);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.updateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, action } = req.body;

  if (action === "like") {
    const query = await Thought.findById(id).select({ likes: 1, _id: -1 });
    const likes = query.likes.map((like) =>
      like.substring(14).substring(0, 24)
    );

    if (likes.some((like) => like === userId)) {
      res.status(400);
      throw new Error("User already included in likes");
    }
    await Thought.findByIdAndUpdate(id, { $push: { likes: userId } });
  }

  if (action === "unlike") {
    await Thought.findByIdAndUpdate(id, { $pull: { likes: userId } });
  }

  res.json({ id, userId, action });
  try {
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

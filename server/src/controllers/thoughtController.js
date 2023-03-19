const asyncHandler = require("express-async-handler");
const Thought = require("../models/thoughtModel");

// @desc    Get feed thoughts
// @route   GET /thoughts
// @access  Public
exports.getFeed = asyncHandler(async (req, res) => {
  const { page } = req.query;
  try {
    const thoughts = await Thought.find()
      .sort({ createdAt: -1 })
      .skip(page * 8)
      .limit(8);
    res.json({ thoughts, end: thoughts.length < 5 });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get thought by id
// @route   GET /thoughts/:id
// @access  Public
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

// @desc    Get thoughts by user id
// @route   GET /thoughts/user/:id
// @access  Public
exports.getByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = Number(req.query.page);
  try {
    const thoughts = await Thought.find({ "userInfo.id": id })
      .sort({ createdAt: -1 })
      .skip(page * 8)
      .limit(8);
    res.json({ thoughts, end: thoughts.length < 5 });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get only liked thoughts by user
// @route   GET /thoughts/user/:id/liked
// @access  Public
exports.getLiked = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const page = Number(req.query.page);
  try {
    const thoughts = await Thought.find({ likes: { $in: [id] } })
      .sort({ createdAt: -1 })
      .skip(page * 8)
      .limit(8);
    res.json({ thoughts, end: thoughts.length < 5 });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get thoughts by emotion
// @route   GET /thoughts/search/emotion
// @access  Public
exports.getByEmotion = asyncHandler(async (req, res) => {
  const page = Number(req.query.page);
  const multiple = req.query.multiple === "true";
  try {
    const thoughts = [];
    if (!multiple) {
      const innerThoughts = await Thought.find({
        emotion: req.query.emotion,
      })
        .sort({ createdAt: -1 })
        .skip(page * 8)
        .limit(8);
      thoughts.push(...innerThoughts);
    } else {
      const filter = { $or: req.query.emotion.map((emotion) => ({ emotion })) };
      const innerThoughts = await Thought.find(filter)
        .sort({ createdAt: -1 })
        .skip(page * 8)
        .limit(8);
      thoughts.push(...innerThoughts);
    }
    res.json({ thoughts, end: thoughts.length < 5 });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get thoughts by username
// @route   GET /thoughts/search/username
// @access  Public
exports.getByUsername = asyncHandler(async (req, res) => {
  const { username } = req.query;
  const page = Number(req.query.page);
  try {
    const thoughts = await Thought.find({ "userInfo.username": username })
      .sort({ createdAt: -1 })
      .skip(page * 8)
      .limit(8);
    res.json({ thoughts, end: thoughts.length < 5 });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Creates a new thought
// @route   POST /thoughts
// @access  Private
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

// @desc    Deletes thought by id
// @route   DELETE /thoughts/:id
// @access  Public
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

// @desc    Updates if thought is liked by user
// @route   PUT /thoughts/:id
// @access  Public
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

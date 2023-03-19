const mongoose = require("mongoose");

const thoughtsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    emotion: {
      type: String,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    userInfo: {
      type: { id: mongoose.Schema.Types.ObjectId, username: String },
      required: true,
      ref: "User",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Thought", thoughtsSchema);

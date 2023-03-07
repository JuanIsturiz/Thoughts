import mongoose from "mongoose";

const thoughtsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    emotion: {
      type: String,
      required: true, //todo change to false
    },
    likes: {
      type: [{ userId: mongoose.Schema.Types.ObjectId }],
      required: false,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Thought", thoughtsSchema);

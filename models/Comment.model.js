const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    favorites: {
      type: Boolean,
      default: false,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentsSchema);
module.exports = Comment;

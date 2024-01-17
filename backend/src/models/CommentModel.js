import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  comment: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCollection",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogCollection",
    },
    commentText: {
      type: String,
      required: [true, "please write something before adding comment"],
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
});

export const commentCollection = mongoose.model(
  "commentCollection",
  commentSchema
);

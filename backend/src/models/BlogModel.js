import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please Enter the blog title"],
  },
  summary: {
    type: String,
    required: [true, "Please enter the summary of the blog"],
  },
  blogImageUrl: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userCollection",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const blogCollection = mongoose.model("blogCollections", blogSchema);

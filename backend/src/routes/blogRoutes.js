import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogDetails,
} from "../controller/blogController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const blogRouter = express.Router();

blogRouter.route("/createBlog").post(isAuthenticated, createBlog);

blogRouter.route("/AllBlog").get(getAllBlogs);
blogRouter.route("/blog/:blogId").get(isAuthenticated, getBlogDetails);

blogRouter.route("/updateBlog/:blogId").put(isAuthenticated, updateBlog);

blogRouter.route("/deleteBlog/:blogId").delete(isAuthenticated, deleteBlog);

export default blogRouter;

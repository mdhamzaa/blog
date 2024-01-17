import { catchAsyncError } from "../middlewares/catchTryMiddleware.js";
import { blogCollection } from "../models/BlogModel.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const createBlog = catchAsyncError(async (req, res, next) => {
  const { title, summary, content, author, blogImageUrl } = req.body;

  console.log("calling blog req body", req.body);

  if (!title || !summary || !content || !author || !blogImageUrl)
    return next(new ErrorHandler("Please add all fields", 400));

  await blogCollection.create({
    title,
    summary,
    content,
    author,
    blogImageUrl,
  });

  res.status(201).json({
    success: true,
    message: "Blog Created Successfully",
  });
});

export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await blogCollection.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});
export const getBlogDetails = catchAsyncError(async (req, res, next) => {
  const { blogId } = req?.params;

  const blog = await blogCollection.findById(blogId);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

export const updateBlog = catchAsyncError(async (req, res, next) => {
  const { blogId } = req.params;
  const { title, summary, content, createdBy } = req.body;

  if (!title && !summary && !content && !createdBy) {
    return next(
      new ErrorHandler("Please provide at least one field to update", 400)
    );
  }

  const updateFields = {};

  if (title) updateFields.title = title;
  if (summary) updateFields.summary = summary;
  if (content) updateFields.content = content;
  if (createdBy) updateFields.createdBy = createdBy;

  const file = req.file;

  if (file) {
    try {
      const fileUri = getDataUri(file);
      const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
      const existingBlog = await blogCollection.findById(blogId);

      if (existingBlog.blogImage) {
        await cloudinary.v2.uploader.destroy(existingBlog.blogImage.public_id);
      }

      updateFields.blogImage = {
        public_id: mycloud.public_id,
        imageUrl: mycloud.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler("Failed to upload blog image", 500));
    }
  }

  const updatedBlog = await blogCollection.findByIdAndUpdate(
    blogId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedBlog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Blog Updated Successfully",
    blog: updatedBlog,
  });
});

export const deleteBlog = catchAsyncError(async (req, res, next) => {
  const { blogId } = req.params;

  const blog = await blogCollection.findById(blogId);

  if (!blog) return next(new ErrorHandler("Blog not found", 404));

  await cloudinary.v2.uploader.destroy(blog.blogImage.public_id);

  await blog.deleteOne();

  res.status(200).json({
    success: true,
    message: "Blog Deleted Successfully",
  });
});

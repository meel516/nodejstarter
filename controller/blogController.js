import { success } from "zod/v4";
import {
  createBlog,
  getAllBlogs,
  getBlogsByUser,
  getBlogByUser,
  patchBlogByUser,
} from "../services/blogService.js";
import { createBlogValidation } from "../validations/blog.js";
const createBlogController = async (req, res) => {
  const { title, image, description } = req.body;
  createBlogValidation.parse(req.body);
  console.log(req.user);
  const result = await createBlog({ title, description, image }, req.user._id);
  res.status(201).json({
    message: "Blog created successfully",
    data: result,
    success: true,
  });
};
const getAllBlogsController = async (req, res) => {
  const result = await getAllBlogs();
  res.status(200).json({
    message: "Blogs fetched successfully",
    data: result,
    success: true,
  });
};
const getBlogsByUserController = async (req, res) => {
  const result = await getBlogsByUser(req.user._id);
  res.status(200).json({
    message: "Blogs fetched successfully",
    data: result,
    success: true,
  });
};
const getBlogByUserController = async () => {
  const blogId = req.params.id;
  const result = await getBlogByUser(blogId, req.user._id);
  res.status(200).json({
    message: "Blog updated successfully",
    data: result,
    success: true,
  });
};
const patchBlogByUserController = async (req, res) => {
  const blogId = req.params.id;
  const { title, description, image } = req.body;
  const result = await patchBlogByUser(blogId, req.user._id, {
    title,
    description,
    image,
  });
  res.status(200).json({
    message: "Blog updated successfully",
    data: result,
    success: true,
  });
};
export {
  createBlogController,
  getAllBlogsController,
  getBlogsByUserController,
  getBlogByUserController,
  patchBlogByUserController,
};

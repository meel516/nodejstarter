import {
  createBlog,
  getAllBlogs,
  getBlogsByUser,
} from "../services/blogService.js";
import { createBlogValidation } from "../validations/blog.js";
const createBlogController = async (req, res) => {
  const { title, image, description } = req.body;
  createBlogValidation.parse(req.body);
  console.log(req.user);
  const result = await createBlog({ title, description, image }, req.user._id);
  res.status(201).json({ message: "Blog created successfully", data: result });
};
const getAllBlogsController = async (req, res) => {
  const result = await getAllBlogs();
  res.status(200).json({ message: "Blogs fetched successfully", data: result });
};
const getBlogsByUserController = async (req, res) => {
  const result = await getBlogsByUser(req.user._id);
  res.status(200).json({ message: "Blogs fetched successfully", data: result });
};
export {
  createBlogController,
  getAllBlogsController,
  getBlogsByUserController,
};

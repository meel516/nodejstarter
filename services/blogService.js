import blogModal from "../model/blogModal.js";
const createBlog = async (blogData, userId) => {
  console.log(userId);
  const res = await blogModal.create({ ...blogData, user: userId });
};
const getAllBlogs = async () => {
  const res = await blogModal.find({}).populate("user");
  return res;
};
const getBlogsByUser = async (userId) => {
  const res = await blogModal.find({ user: userId });
  return res;
};
export { createBlog, getAllBlogs, getBlogsByUser };

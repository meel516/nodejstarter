import blogModal from "../model/blogModal.js";
const createBlog = async (blogData, userId) => {
  console.log(userId);
  const res = await blogModal.create({ ...blogData, user: userId });
};
const getAllBlogs = async () => {
  const res = await blogModal.find({}).populate("user");
  return res;
};
const getBlogById = async (blogId) => {
  const res = await blogModal.findById(blogId).populate("user");
};
const getBlogsByUser = async (userId) => {
  const res = await blogModal.find({ user: userId }).populate("user");
  return res;
};
const getBlogByUser = async (blogId, userId) => {
  const res = await blogModal
    .findOne({ user: userId, _id: blogId })
    .populate("user");
  return res;
};
const patchBlogByUser = async (blogId, userId, updateData) => {
  const res = await blogModal.findOneAndUpdate(
    { _id: blogId, user: userId }, // only update if user owns the blog
    { $set: updateData }, // fields to update
    { new: true } // return the updated blog instead of the old one
  );

  return res;
};
export {
  createBlog,
  getAllBlogs,
  getBlogsByUser,
  patchBlogByUser,
  getBlogByUser,
  getBlogById,
};

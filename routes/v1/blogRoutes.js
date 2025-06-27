import express from "express";
import {
  createBlogController,
  getAllBlogsController,
  getBlogsByUserController,
  patchBlogByUserController,
  getBlogByUserController,
  getBlogByIdController,
} from "../../controller/blogController.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();
// Protected routes first, with clear prefixes
router.use("/user", verifyToken); // Only apply to /user routes

router.get("/user", getBlogsByUserController); // GET /blogs/user (current user)
router.post("/user", createBlogController); // POST /blogs/user
router.get("/user/:id", getBlogByUserController); // GET /blogs/user/:id
router.patch("/user/:id", patchBlogByUserController); // PATCH /blogs/user/:id

// Public routes
router.get("/", getAllBlogsController); // GET /blogs
router.get("/id/:id", getBlogByIdController); // GET /blogs/id/:id (avoid catch-all)

export default router;

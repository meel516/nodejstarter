import express from "express";
import {
  createBlogController,
  getAllBlogsController,
  getBlogsByUserController,
} from "../../controller/blogController.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();

router.get("/", getAllBlogsController);
router.use(verifyToken);
router.get("/user", getBlogsByUserController);
router.post("/create", createBlogController);

export default router;

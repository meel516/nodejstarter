import express from "express";
import {
  createBlogController,
  getAllBlogsController,
  getBlogsByUserController,
  patchBlogByUserController,
  getBlogByUserController,
} from "../../controller/blogController.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.get("/", getAllBlogsController);
router.use(verifyToken);
router.get("/user", getBlogsByUserController);
router.post("/user", createBlogController);
router.get("/user/:id", getBlogByUserController);
router.patch("/user/:id", patchBlogByUserController);

export default router;

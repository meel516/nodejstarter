import express from "express";

import errorHandler from "../../middleware/error.js";
import blogRoutes from "./blogRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth", authRoutes);
router.use(errorHandler);

export default router;

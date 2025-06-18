import express from "express";

import errorHandler from "../../middleware/error.js";
import blogRoutes from "./blogRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/blogs", blogRoutes);
router.use(errorHandler);

export default router;

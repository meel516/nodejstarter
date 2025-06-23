import express from "express";
import {
  getUserController,
  loginController,
  registerController,
} from "../../controller/userController.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();
router.post("/register", registerController);

router.post("/login", loginController);
router.use(verifyToken);
router.get("/verify", getUserController);

export default router;

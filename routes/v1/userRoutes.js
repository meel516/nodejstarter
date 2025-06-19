import express from "express";
import {
  getUserController,
  UpdateUserController,
  getAllUsersController,
} from "../../controller/userController.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();

router.use(verifyToken);
router.get("/", getAllUsersController);
router.get("/user", getUserController);
router.patch("/user", UpdateUserController);

export default router;

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  changePassword,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", verifyToken, getUserProfile);
router.put("/:id", verifyToken, changePassword);
export default router;

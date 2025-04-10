import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  getTodo,
  updateTodo,
  setTodoDone,
  getDoneTodos,
  getPendingTodos,
} from "../controllers/todoController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending", verifyToken, getPendingTodos);
router.get("/done", verifyToken, getDoneTodos);
router.post("/", verifyToken, addTodo);
router.get("/:id", verifyToken, getTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.put("/done/:id", verifyToken, setTodoDone);
router.get("/", verifyToken, getTodos);
export default router;

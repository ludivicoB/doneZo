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

router.get("/", verifyToken, getTodos);
router.post("/", verifyToken, addTodo);
router.get("/:id", verifyToken, getTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.put("/done/:id", verifyToken, setTodoDone);
router.get("/done/:id", verifyToken, getDoneTodos);
router.get("/pending/:id", verifyToken, getPendingTodos);
export default router;

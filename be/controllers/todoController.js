import db from "../db.js";

export const getTodos = (req, res) => {
  db.query(
    "SELECT * FROM todos WHERE user_id = ? ",
    [req.user.id],
    (err, results) => {
      if (err)
        return res.status(500).json({ message: "Error retrieving tasks" });
      res.json(results);
    }
  );
};

export const addTodo = (req, res) => {
  const { task } = req.body;
  db.query(
    "INSERT INTO todos (user_id, task) VALUES (?, ?)",
    [req.user.id, task],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error adding task" });
      }
      const todoId = result.insertId;
      db.query("SELECT * FROM todos where id=?", [todoId], (err, result) => {
        if (err) {
          return res.json({ message: err.message });
        }
        res.json({
          message: "Task added successfully",
          todo: result[0],
          status: "success",
        });
      });
    }
  );
};

export const getTodo = (req, res) => {
  db.query(
    "SELECT * FROM todos WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Error retrieving task" });
      res.json(result);
    }
  );
};

export const updateTodo = (req, res) => {
  const { task } = req.body;
  db.query(
    "UPDATE todos SET task = ? WHERE id = ? AND user_id = ?",
    [task, req.params.id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error updating task" });
      res.json({ message: "Task updated successfully" });
    }
  );
};

export const deleteTodo = (req, res) => {
  db.query(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error deleting task" });
      res.json({ message: "Task deleted successfully" });
    }
  );
};

export const setTodoDone = (req, res) => {
  db.query(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [true, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Error updating task" });
      res.json({ message: "Task updated successfully" });
    }
  );
};

export const getPendingTodos = (req, res) => {
  db.query(
    "SELECT * FROM todos WHERE user_id = ? AND completed = 0",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error getting Todos" });
      res.json({
        message: "Successfully Retrieved Pending Todos",
        todos: results,
      });
    }
  );
};

export const getDoneTodos = (req, res) => {
  db.query(
    "SELECT * FROM todos WHERE user_id = ? AND completed = 1",
    [req.user.id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error getting Todos", error: err.message });
      }
      res.json({
        message: "Successfully Retrieved Completed Todos",
        todos: result,
      });
    }
  );
};

import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const AddTodoModal = ({ open, onClose, onSubmit }) => {
  const selectedTodo = useSelector((state) => state.todo.selectedTodo); // Get the selectedTodo from Redux
  const [taskName, setTaskName] = useState("");

  // Update taskName when selectedTodo changes
  useEffect(() => {
    if (selectedTodo?.task) {
      setTaskName(selectedTodo.task); // Set taskName to the selectedTodo's task
    }
  }, [selectedTodo]);

  const handleSubmit = () => {
    if (taskName.trim() !== "") {
      onSubmit(taskName, selectedTodo.id);
      // setTaskName(""); // Reset task name after submit
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          borderRadius: 2,
          padding: 3,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Update Todo
        </Typography>
        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={taskName.trim() === ""}
        >
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTodoModal;

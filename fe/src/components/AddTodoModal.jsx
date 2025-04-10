import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const AddTodoModal = ({ open, onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = () => {
    if (taskName.trim() !== "") {
      onSubmit(taskName);
      setTaskName(""); // Reset task name after submit
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
          Add New Todo
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
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTodoModal;

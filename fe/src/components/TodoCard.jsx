import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { setSelectedTodo } from "../redux/slices/todoSlice";
const TodoCard = ({ todo, setTodoDone, openModal }) => {
  const dispatch = useDispatch();
  const handleDone = (id) => {
    setTodoDone(id);
  };
  const handleOpenEditModal = (todo) => {
    dispatch(setSelectedTodo(todo));
    openModal();
  };
  return (
    <Box
      sx={{
        width: "800px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.paper", // or use any custom color
        boxShadow: 1,
      }}
      key={todo.id}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {todo.task}
        </Typography>
        <Typography
          sx={{
            color: "gray",
            textTransform: "capitalize",
          }}
        >
          {todo.completed ? "Done" : "Pending"}
        </Typography>
      </Box>

      {/* Add checkbox or indicator */}
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Button
          id={todo.id}
          variant="contained"
          endIcon={<EditIcon />}
          onClick={() => {
            handleOpenEditModal(todo);
          }}
          sx={{ bgcolor: "white", color: "#1976d2" }}
        >
          Edit
        </Button>
        <Button
          id={todo.id}
          variant="contained"
          endIcon={<CheckIcon />}
          onClick={() => {
            handleDone(todo.id);
          }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export default TodoCard;

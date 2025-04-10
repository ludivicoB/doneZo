import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
const TodoCard = ({ todo }) => {
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
      <Box sx={{ display: "flex", gap: "0.5rem" }}></Box>
    </Box>
  );
};

export default TodoCard;

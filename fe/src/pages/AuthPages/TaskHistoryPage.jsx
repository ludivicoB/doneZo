import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import TodoCardDone from "../../components/TodoCardDone";
const TaskHistoryPage = () => {
  const apiurl = useSelector((state) => state.todo.apiUrl);
  const [doneTodos, setDoneTodos] = useState([]);
  useEffect(() => {
    const fetchDoneTasks = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiurl}/done`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        console.log(res.data);
        setDoneTodos(res.data.todos);
      }
    };
    fetchDoneTasks();
  }, []);
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ color: "white", textAlign: "center", padding: "2rem" }}
      >
        FINISHED TASKS
      </Typography>
      <Box
        sx={{
          gap: "1rem",
          mt: "1rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {doneTodos.length > 0 ? (
          doneTodos.map((todo) => (
            <TodoCardDone
              todo={todo}
              key={todo.id}
              setTodoDone={setDoneTodos}
            />
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", color: "gray" }}>
            There are no TODOs
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TaskHistoryPage;

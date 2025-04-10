import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions
import { logout } from "../../redux/slices/authSlice"; // Import the logout action
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect the user
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import AddTodoModal from "../../components/AddTodoModal";
import TodoCards from "../../components/TodoCard";
import AlertNotification from "../../components/util/AlertNotification";
const HomePage = () => {
  const middle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const apiurl = useSelector((state) => state.todo.apiUrl);
  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate(); // Hook to navigate to other routes
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiurl}/pending`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setTodos(res.data.todos);
      }
    };
    fetchUser();
  }, []);

  const handleAddTodo = async (taskName) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiurl}`,
        {
          task: taskName,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.status == "success") {
        console.log(res.data.todo);
        setTodos((prevTodos) => [...prevTodos, res.data.todo]);
      }
    } catch (error) {
      console.log(error.message);
    }

    handleCloseModal(); // Close the modal after submission
  };
  const setTodoDone = async (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    try {
      console.log("hello");
      const res = await axios.put(
        `${apiurl}/done/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    // Dispatch the logout action to clear the Redux state
    dispatch(logout());
    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div>
      <Button
        onClick={() => {
          console.log(todos);
        }}
      >
        todos
      </Button>
      <Box
        sx={
          (middle, { flexDirection: "column", gap: "1rem", bgcolor: "#242424" })
        }
      >
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{ height: "3rem" }}
        >
          Logout
        </Button>
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
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCards todo={todo} key={todo.id} setTodoDone={setTodoDone} />
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", color: "gray" }}
            >
              There are no TODOs
            </Typography>
          )}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add Todo
          </Button>
        </Box>
      </Box>
      <AddTodoModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleAddTodo}
      />
      <AlertNotification snackbar={snackbar} setSnackbar={setSnackbar} />
    </div>
  );
};

export default HomePage;

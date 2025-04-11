import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import AddTodoModal from "../../components/AddTodoModal";
import UpdateTodoModal from "../../components/UpdateTodoModal";
import TodoCards from "../../components/TodoCard";
import AlertNotification from "../../components/util/AlertNotification";
const HomePage = () => {
  const dispatch = useDispatch();
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
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  //FETCH USER TODOS
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

  //ADD TODO
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

  //SET TODO AS DONE
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
          message: "Task Finished!",
          severity: "success",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //UPDATE TODO
  const handleUpdateTodo = async (taskname, id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `${apiurl}/${id}`,
        { id: id, task: taskname },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.status == "success") {
        setTodos(res.data.todos);
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      handleCloseUpdateModal();
    }
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  return (
    <div>
      <Box
        sx={
          (middle,
          {
            flexDirection: "column",
            gap: "1rem",
            bgcolor: "#242424",
            pb: "3rem",
          })
        }
      >
        <Typography
          variant="h4"
          sx={{ color: "white", textAlign: "center", padding: "2rem" }}
        >
          PENDING TASKS
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
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCards
                todo={todo}
                key={todo.id}
                setTodoDone={setTodoDone}
                openModal={handleOpenUpdateModal}
              />
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
      <UpdateTodoModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        onSubmit={handleUpdateTodo}
      />
      <AlertNotification snackbar={snackbar} setSnackbar={setSnackbar} />
    </div>
  );
};

export default HomePage;

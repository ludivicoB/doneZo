import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch to dispatch actions
import { logout } from "../../redux/authSlice"; // Import the logout action
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect the user
import { Button, Typography } from "@mui/material";
import axios from "axios";
const HomePage = () => {
  const apiurl = useSelector((state) => state.todo.apiUrl);
  const dispatch = useDispatch(); // Hook to dispatch actions
  const navigate = useNavigate(); // Hook to navigate to other routes
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${apiurl}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        console.log(res.data);
      }
    };
    fetchUser();
  });
  const handleLogout = () => {
    // Dispatch the logout action to clear the Redux state
    dispatch(logout());

    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div>
      <Typography variant="h2">Welcome, you are logged in!</Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;

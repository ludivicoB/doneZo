import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab, Box, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current URL
  // Set the default tab based on the current location (path)
  const getTabValue = (path) => {
    switch (path) {
      case "/home":
        return 1; // Pending Tasks
      case "/finished-tasks":
        return 2; // Finished Tasks
      case "/profile":
        return 0; // Profile
      default:
        return 1; // Default to Pending Tasks if the path doesn't match
    }
  };

  const [value, setValue] = useState(getTabValue(location.pathname)); // Set the default value based on current path

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the selected tab index
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear Redux state
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    // Update the value whenever the location changes (e.g., when navigating between tabs)
    setValue(getTabValue(location.pathname));
  }, [location.pathname]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="navbar tabs"
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ flexGrow: 1 }}
          >
            <Tab
              label="Profile"
              component={Link}
              to="/profile"
              sx={{ textDecoration: "none", color: "white" }}
            />
            <Tab
              label="Pending Tasks"
              component={Link}
              to="/home"
              sx={{ textDecoration: "none", color: "white" }}
            />
            <Tab
              label="Finished Tasks"
              component={Link}
              to="/finished-tasks"
              sx={{ textDecoration: "none", color: "white" }}
            />
          </Tabs>
          <Button
            variant="outlined"
            sx={{ color: "white", marginRight: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
};

export default NavBar;

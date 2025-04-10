import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
const NavBar = () => {
  const [value, setValue] = useState(0); // Track the currently selected tab
  const navigate = useNavigate(); // For navigating after logout
  const dispatch = useDispatch(); // Assuming you are using Redux

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update selected tab index
  };

  const handleLogout = () => {
    // Dispatch the logout action to clear the Redux state
    dispatch(logout());
    // Redirect the user to the login page
    navigate("/login");
  };

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
            sx={{ flexGrow: 1 }} // Ensure the tabs take up the remaining space
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
            sx={{ color: "white", marginRight: 2 }} // Add some space to the right
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

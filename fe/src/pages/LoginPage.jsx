import { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlertNotification from "../components/util/AlertNotification";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../redux/authSlice"; // import the action
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const goTo = useNavigate();
  const apiUrl = useSelector((state) => state.auth.apiUrl);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log(loginData);

    if (loginData.username === "" || loginData.password === "") {
      setSnackbar({
        open: true,
        message: "Please fill all input fields",
        severity: "error",
      });
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/login`, {
        identifier: loginData.username,
        password: loginData.password,
      });

      if (res.data?.status === "success") {
        const token = res.data.token;
        console.log(res.data);

        dispatch(setLoginState({ isLoggedIn: true }));
        localStorage.setItem("token", token);

        goTo("/home");
      } else {
        setSnackbar({
          open: true,
          message: res.data?.message,
          severity: "error",
        });
      }
    } catch (error) {
      console.log("Server Error", error.message);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "20rem",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Welcome Back
        </Typography>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => {
            setLoginData({ ...loginData, username: e.target.value });
          }}
        />
        <FormControl sx={{}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ height: "3rem" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "blue", textDecoration: "none" }}>
            Register
          </a>
        </Typography>
      </Box>
      <AlertNotification snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
};

export default LoginPage;

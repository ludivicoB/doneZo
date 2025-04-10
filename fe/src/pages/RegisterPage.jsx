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
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import AlertNotification from "../components/util/AlertNotification";
const RegisterPage = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    console.log("Register Data:", registerData);
    if (
      registerData.username == "" ||
      registerData.password == "" ||
      registerData.email == ""
    ) {
      setSnackbar({
        open: true,
        message: "Fill up the input fields",
        severity: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      if (res.data) {
        console.log(res.data);
      }
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
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
          bgcolor: "white",
          padding: "4rem",
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Create Account
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          value={registerData.username}
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
        />

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
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
          {loading ? <CircularProgress sx={{ color: "white" }} /> : "Register"}
        </Button>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Have an account?{" "}
          <a href="/login" style={{ color: "blue" }}>
            Login
          </a>
        </Typography>
      </Box>
      <AlertNotification snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
};

export default RegisterPage;

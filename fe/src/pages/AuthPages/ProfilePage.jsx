import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlertNotification from "../../components/util/AlertNotification";
import { useSelector } from "react-redux";
import axios from "axios";
export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});
  const [fetching, setFetching] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const initialPasswordState = {
    oldpass: "",
    newpass: "",
    confirmpass: "",
    showOldpass: false,
    showNewpass: false,
    showConfirmpass: false,
  };
  const [usePassword, setUserPassword] = useState(initialPasswordState);

  const apiurl = useSelector((state) => state.user.apiUrl);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      // code here
      try {
        const res = await axios.get(`${apiurl}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (res.status == 200) {
          console.log(res.data);
          console.log("status", res.status);
          setUserProfile(res.data[0]);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUserPassword({ ...usePassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (usePassword.newpass !== usePassword.confirmpass) {
      setSnackbar({
        open: true,
        message: "Passwords do not match",
        severity: "error",
      });
      return;
    }
    console.log(usePassword);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${apiurl}`,
        {
          oldpassword: usePassword.oldpass,
          newpassword: usePassword.newpass,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status == "success") {
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: res.data.message,
          severity: "error",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setUserPassword(initialPasswordState);
    }
  };

  if (fetching) {
    return (
      <Box>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ bgcolor: "gray", p: "3rem", borderRadius: "20px" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", textAlign: "center", mb: "2rem" }}
        >
          Profile Page
        </Typography>
        <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Username: </span>
          {userProfile.username}
        </Typography>
        <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>Email: </span>
          {userProfile.email}
        </Typography>
        <Divider sx={{ my: "2rem", color: "black" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ opacity: "0.5" }}>Update Password</Typography>
          <TextField
            value={usePassword.oldpass}
            label="Old Password"
            name="oldpass"
            type={usePassword.showOldpass ? "text" : "password"}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setUserPassword({
                        ...usePassword,
                        showOldpass: !usePassword.showOldpass,
                      })
                    }
                    edge="end"
                  >
                    {usePassword.showOldpass ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={usePassword.newpass}
            label="New Password"
            name="newpass"
            type={usePassword.showNewpass ? "text" : "password"}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setUserPassword({
                        ...usePassword,
                        showNewpass: !usePassword.showNewpass,
                      })
                    }
                    edge="end"
                  >
                    {usePassword.showNewpass ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={usePassword.confirmpass}
            label="Confirm Password"
            name="confirmpass"
            type={usePassword.showConfirmpass ? "text" : "password"}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setUserPassword({
                        ...usePassword,
                        showConfirmpass: !usePassword.showConfirmpass,
                      })
                    }
                    edge="end"
                  >
                    {usePassword.showConfirmpass ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{ height: "3rem" }}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
      <AlertNotification snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
}

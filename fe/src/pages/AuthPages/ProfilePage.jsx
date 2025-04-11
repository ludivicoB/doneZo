import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});
  const [fetching, setFetching] = useState(true);
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
  if (fetching) {
    return (
      <Box>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "white", textAlign: "center" }}>
        Profile Page
      </Typography>
      <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
        {userProfile.username}
      </Typography>
      <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
        {userProfile.email}
      </Typography>
    </Box>
  );
}

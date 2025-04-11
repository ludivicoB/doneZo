import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const goTo = useNavigate();
  return (
    <Box
      sx={{
        // width: "100%",
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
        color: "white",
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Welcome to Website✅
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        maxWidth="600px"
        mb={4}
        sx={{ color: "white" }}
      >
        Description Here
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            goTo("/login");
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;

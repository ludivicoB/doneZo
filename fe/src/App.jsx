import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/AuthPages/HomePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/home" /> : <RegisterPage />}
      />

      {/* Protect home page with PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;

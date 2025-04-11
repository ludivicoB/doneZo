import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/AuthPages/HomePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar.jsx";
import TaskHistoryPage from "./pages/AuthPages/TaskHistoryPage.jsx";
import ProfilePage from "./pages/AuthPages/ProfilePage.jsx";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      {isLoggedIn && <NavBar />}

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
          <Route path="/finished-tasks" element={<TaskHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

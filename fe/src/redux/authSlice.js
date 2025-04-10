// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUrl: "http://localhost:5000/auth",
  isLoggedIn: localStorage.getItem("loggedIn") === "true", // Initialize from localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      // Persist to localStorage
      if (action.payload.isLoggedIn) {
        localStorage.setItem("loggedIn", "true");
      } else {
        localStorage.removeItem("loggedIn");
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;

      // Remove from localStorage
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
    },
  },
});

export const { setLoginState, logout } = authSlice.actions;
export default authSlice.reducer;

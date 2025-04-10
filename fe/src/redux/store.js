import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Path to your authSlice
import todoReducer from "./todoSlice";
const store = configureStore({
  reducer: {
    auth: authReducer, // Your auth slice goes here
    todo: todoReducer,
  },
});

export default store;

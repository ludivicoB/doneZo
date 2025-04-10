import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Path to your authSlice
import todoReducer from "./slices/todoSlice";
const store = configureStore({
  reducer: {
    auth: authReducer, // Your auth slice goes here
    todo: todoReducer,
  },
});

export default store;

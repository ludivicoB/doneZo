import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // Path to your authSlice
import todoReducer from "./slices/todoSlice";
import userReducer from "./slices/userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer, // Your auth slice goes here
    todo: todoReducer,
    user: userReducer,
  },
});

export default store;

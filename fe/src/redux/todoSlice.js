import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUrl: "http://localhost:5000/todos",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
});
export default todoSlice.reducer;

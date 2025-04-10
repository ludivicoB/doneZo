import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUrl: "http://localhost:5000/todos",
  newTodo: { task: "", completed: 0 },
  viewedTodo: { task: "", completed: 0 },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
});
export const {} = todoSlice.actions;
export default todoSlice.reducer;

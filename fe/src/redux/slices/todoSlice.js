import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUrl: "http://localhost:5000/todos",
  newTodo: { task: "", completed: 0 },
  selectedTodo: { task: "", completed: 0 },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Reducer to set the selected todo
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload; // Update selectedTodo with the provided payload
    },
  },
});

export const { setSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;

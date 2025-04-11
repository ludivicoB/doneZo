import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiUrl: "http://localhost:5000/user",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;

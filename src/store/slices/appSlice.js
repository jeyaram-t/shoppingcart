import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    userName: "s"
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    }
  }
});

export const { setUserName } = slice.actions;

export default slice.reducer;

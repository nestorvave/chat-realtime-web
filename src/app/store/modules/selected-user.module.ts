import { createSlice } from "@reduxjs/toolkit";
import { defaultValueSelectedUser } from "../interfaces/selected-user.interface";

export const userSlice = createSlice({
  name: "user",
  initialState: defaultValueSelectedUser,
  reducers: {
    setSelectedUser: (state, action) => ({ ...state, ...action.payload }),
    resetSelectedUser: () => defaultValueSelectedUser,
  },
});

export const { setSelectedUser, resetSelectedUser } = userSlice.actions;

export default userSlice.reducer;

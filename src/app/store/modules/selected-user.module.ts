import { createSlice } from "@reduxjs/toolkit";
import { defaultValueSelectedChat } from "../interfaces/selected-user.interface";

export const selectedChatSlice = createSlice({
  name: "selectedUser",
  initialState: defaultValueSelectedChat,
  reducers: {
    setSelectedUser: (state, action) => ({ ...state, ...action.payload }),
    resetSelectedUser: () => defaultValueSelectedChat,
  },
});

export const { setSelectedUser, resetSelectedUser } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { defaultValueSelectedChat } from "../interfaces/selected-user.interface";

export const selectedChatSlice = createSlice({
  name: "selectedUser",
  initialState: defaultValueSelectedChat,
  reducers: {
    setSelectedChat: (state, action) => ({ ...state, ...action.payload }),
    resetSelectedChat: () => defaultValueSelectedChat,
  },
});

export const { setSelectedChat, resetSelectedChat } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;

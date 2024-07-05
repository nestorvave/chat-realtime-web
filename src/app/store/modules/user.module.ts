import { createSlice } from '@reduxjs/toolkit';
import { defaultValueUser } from '../interfaces/user.interface';


export const userSlice = createSlice({
  name: 'user',
  initialState: defaultValueUser,
  reducers: {
    setUser: (state, action) => ({ ...state, ...action.payload }),
    editUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => defaultValueUser,
  },
});

export const { setUser, editUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

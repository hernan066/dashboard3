/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    whatsappUser: null,
    listUsers: null,
    editUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    register: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    getWhatsappUser: (state, action) => {
      state.whatsappUser = action.payload;
    },
    getWhatsappUserAddress: (state, action) => {
      state.whatsappUser = { ...state.whatsappUser, ...action.payload };
    },
    getListUsers: (state, action) => {
      state.listUsers = action.payload;
    },
    getUserDispatch: (state, action) => {
      state.editUser = action.payload;
    },
  },
});

export const {
  login,
  register,
  logout,
  getWhatsappUser,
  getWhatsappUserAddress,
  getListUsers,
  getUserDispatch,
} = userSlice.actions;
export default userSlice.reducer;

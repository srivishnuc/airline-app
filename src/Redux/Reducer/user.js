import { userState as initialState } from '../initialState';
import { REQ_URL, USER_LOGIN } from '../actionConstant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userState } from '../initialState';
import axios from 'axios';

export const getUsers = createAsyncThunk(USER_LOGIN, async (payload) => {
 try {
  const res = await axios.get(
   `${REQ_URL}users?username=${payload.username}&password=${payload.password}`
  );
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const user = createSlice({
 name: 'USER',
 initialState,
 reducers: { LOGOUT: (state) => (state = userState) },
 extraReducers: {
  [getUsers.pending]: (state) => {
   state.msg = 'Fetching data';
  },
  [getUsers.fulfilled]: (state, { payload }) => {
   state.user = payload;
   state.msg = 'Success fetching data';
  },
  [getUsers.rejected]: (state) => {
   state.msg = 'Login failed username/password incorrect';
  }
 }
});

export const { LOGOUT } = user.actions;
export const users = user.reducer;

import { staffState as initialState } from '../initialState';
import { URL, CHECKIN, EDIT_CHECKIN, EDIT_SERVICES } from '../actionTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCheckin = createAsyncThunk(CHECKIN, async (payload) => {
 try {
  const res = await axios.get(`${URL}checkin`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const editCheckin = createAsyncThunk(EDIT_CHECKIN, async (payload, { dispatch }) => {
 try {
  const res = await axios.patch(`${URL}checkin/${payload.id}`, payload.data);
  dispatch(getCheckin());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const editServices = createAsyncThunk(EDIT_SERVICES, async (payload, { dispatch }) => {
 try {
  const res = await axios.patch(`${URL}checkin/${payload.id}`, payload.data);
  dispatch(getCheckin());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const staff = createSlice({
 name: 'STAFF',
 initialState,
 reducers: {},
 extraReducers: {
  [getCheckin.fulfilled]: (state, { payload }) => {
   state.checkin = payload;
  },
  [getCheckin.rejected]: (state) => {
   state.checkin = [];
  }
 }
});

export const staffs = staff.reducer;

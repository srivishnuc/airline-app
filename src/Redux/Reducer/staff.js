import { staffState as initialState } from '../initialState';
import { REQ_URL, CHECKIN, EDIT_CHECKIN, EDIT_SERVICES } from '../actionConstant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCheckin = createAsyncThunk(CHECKIN, async (payload) => {
 try {
  const res = await axios.get(`${REQ_URL}checkin`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const editCheckin = createAsyncThunk(EDIT_CHECKIN, async (payload, { dispatch }) => {
 try {
  const res = await axios.patch(`${REQ_URL}checkin/${payload.id}`, payload.data);
  dispatch(getCheckin());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const editServices = createAsyncThunk(EDIT_SERVICES, async (payload, { dispatch }) => {
 try {
  const res = await axios.patch(`${REQ_URL}checkin/${payload.id}`, payload.data);
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
  [getCheckin.pending]: (state) => {
   state.msg = '';
  },
  [getCheckin.fulfilled]: (state, { payload }) => {
   state.checkin = payload;
   state.msg = 'Success fetching checkin details';
  },
  [getCheckin.rejected]: (state) => {
   state.checkin = [];
   state.msg = 'Failed fetching checkin details';
  },
  [editCheckin.fulfilled]: (state) => {
   state.msg = 'Passenger status updated';
  },
  [editCheckin.rejected]: (state) => {
   state.msg = 'Passenger status updation failed';
  },
  [editServices.fulfilled]: (state) => {
   state.msg = 'Passenger services updated';
  },
  [editServices.rejected]: (state) => {
   state.msg = 'Passenger services updation failed';
  }
 }
});

export const staffs = staff.reducer;

import { adminState as initialState } from '../initialState';
import {
 REQ_URL,
 ADMIN_SERVICES,
 PASSENGER_LIST,
 ADMIN_LIST,
 ADD_ANCILLARY,
 DEL_ANCILLARY,
 EDIT_ANCILLARY,
 ADD_PASSENGER,
 EDIT_PASSENGER
} from '../actionConstant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFlightDetails = createAsyncThunk(ADMIN_LIST, async (payload) => {
 try {
  const res = await axios.get(`${REQ_URL}flights`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const getAncillary = createAsyncThunk(ADMIN_SERVICES, async (payload) => {
 try {
  const res = await axios.get(`${REQ_URL}services`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const postAncillary = createAsyncThunk(ADD_ANCILLARY, async (payload, { dispatch }) => {
 try {
  const res = await axios.post(`${REQ_URL}services`, payload);
  dispatch(getAncillary());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const editAncillary = createAsyncThunk(EDIT_ANCILLARY, async (payload, { dispatch }) => {
 try {
  const res = await axios.put(`${REQ_URL}services/${payload.id}`, payload.data);
  dispatch(getAncillary());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const delAncillary = createAsyncThunk(DEL_ANCILLARY, async (payload, { dispatch }) => {
 try {
  const res = await axios.delete(`${REQ_URL}services/${payload.id}`);
  dispatch(getAncillary());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const getPassengers = createAsyncThunk(PASSENGER_LIST, async (payload) => {
 try {
  const res = await axios.get(`${REQ_URL}passengers`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const postPassenger = createAsyncThunk(ADD_PASSENGER, async (payload, { dispatch }) => {
 try {
  const passegerRes = await axios.post(`${REQ_URL}passengers`, payload);
  const checkinRes = await axios.post(`${REQ_URL}checkin`, payload.checkin);
  dispatch(getPassengers());
  return JSON.stringify({ passegerRes, checkinRes });
 } catch (err) {
  console.log(err);
 }
});

export const editPassenger = createAsyncThunk(EDIT_PASSENGER, async (payload, { dispatch }) => {
 try {
  const res = await axios.put(`${REQ_URL}passengers/${payload.id}`, payload.data);
  dispatch(getPassengers());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const admin = createSlice({
 name: 'ADMIN',
 initialState,
 reducers: {},
 extraReducers: {
  [getAncillary.fulfilled]: (state, { payload }) => {
   state.services = payload;
  },
  [getAncillary.rejected]: (state) => {
   state.services = [];
   state.msg = 'Failed fetching services data';
  },
  [getPassengers.fulfilled]: (state, { payload }) => {
   state.passengers = payload;
  },
  [getPassengers.rejected]: (state) => {
   state.passengers = [];
   state.msg = 'Failed fetching passenger details';
  },
  [getFlightDetails.fulfilled]: (state, { payload }) => {
   state.flights = payload;
  },
  [getFlightDetails.rejected]: (state) => {
   state.msg = 'Failed fetching flight details';
  },
  [postAncillary.fulfilled]: (state) => {
   state.msg = 'New service added successfully';
  },
  [postAncillary.rejected]: (state) => {
   state.msg = 'Failed adding new service';
  },
  [delAncillary.fulfilled]: (state) => {
   state.msg = 'Service inactivated';
  },
  [delAncillary.rejected]: (state) => {
   state.msg = 'Service activated';
  },
  [editAncillary.fulfilled]: (state) => {
   state.msg = 'Service updated';
  },
  [editAncillary.rejected]: (state) => {
   state.msg = 'Service updation failed';
  },
  [postPassenger.rejected]: (state) => {
   state.msg = 'Failed adding new Passenger';
  },
  [postPassenger.fulfilled]: (state) => {
   state.msg = 'New Passenger added';
  },
  [editPassenger.fulfilled]: (state) => {
   state.msg = 'Passenger updated successfully';
  },
  [editPassenger.rejected]: (state) => {
   state.msg = 'Passenger updation failed';
  }
 }
});

export const admins = admin.reducer;

import { adminState as initialState } from '../initialState';
import {
 URL,
 ADMIN_SERVICES,
 PASSENGER_LIST,
 ADMIN_LIST,
 ADD_ANCILLARY,
 DEL_ANCILLARY,
 EDIT_ANCILLARY,
 ADD_PASSENGER,
 EDIT_PASSENGER
} from '../actionTypes';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getServices = createAsyncThunk(ADMIN_SERVICES, async (payload) => {
 try {
  const res = await axios.get(`${URL}services`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const getPassengers = createAsyncThunk(PASSENGER_LIST, async (payload) => {
 try {
  const res = await axios.get(`${URL}passengers`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const getFlights = createAsyncThunk(ADMIN_LIST, async (payload) => {
 try {
  const res = await axios.get(`${URL}flights`);
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const postAncillary = createAsyncThunk(ADD_ANCILLARY, async (payload, { dispatch }) => {
 try {
  const res = await axios.post(`${URL}services`, payload);
  dispatch(getServices());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const delAncillary = createAsyncThunk(DEL_ANCILLARY, async (payload, { dispatch }) => {
 try {
  const res = await axios.delete(`${URL}services/${payload.id}`);
  dispatch(getServices());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const editAncillary = createAsyncThunk(EDIT_ANCILLARY, async (payload, { dispatch }) => {
 try {
  const res = await axios.put(`${URL}services/${payload.id}`, payload.data);
  dispatch(getServices());
  return res.data;
 } catch (err) {
  console.log(err);
 }
});

export const postPassenger = createAsyncThunk(ADD_PASSENGER, async (payload, { dispatch }) => {
 try {
  const passegerRes = await axios.post(`${URL}passengers`, payload);
  const checkinRes = await axios.post(`${URL}checkin`, payload.checkin);
  dispatch(getPassengers());
  return { passegerRes, checkinRes };
 } catch (err) {
  console.log(err);
 }
});

export const editPassenger = createAsyncThunk(EDIT_PASSENGER, async (payload, { dispatch }) => {
 try {
  const res = await axios.put(`${URL}passengers/${payload.id}`, payload.data);
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
  [getServices.fulfilled]: (state, { payload }) => {
   state.services = payload;
  },
  [getServices.rejected]: (state) => {
   state.services = [];
  },
  [getPassengers.fulfilled]: (state, { payload }) => {
   state.passengers = payload;
  },
  [getPassengers.rejected]: (state) => {
   state.passengers = [];
  },
  [getFlights.fulfilled]: (state, { payload }) => {
   state.flights = payload;
  },
  [getFlights.rejected]: (state) => {
   state.flights = [];
  }
 }
});

export const admins = admin.reducer;

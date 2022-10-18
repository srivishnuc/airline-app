import { admin_state as initialState } from "../initialState"
import { URL, ADMIN_SERVICES, PASSENGER_LIST, ADMIN_LIST, ADD_ANCILLARY, DEL_ANCILLARY } from "../actionTypes"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getServices = createAsyncThunk(ADMIN_SERVICES, async (payload) => {
    try {
        const res = await axios.get(`${URL}services`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const getPassengers = createAsyncThunk(PASSENGER_LIST, async (payload) => {
    try {
        const res = await axios.get(`${URL}passengers`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const getFlights = createAsyncThunk(ADMIN_LIST, async (payload) => {
    try {
        const res = await axios.get(`${URL}flights`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const postAncillary = createAsyncThunk(ADD_ANCILLARY, async (payload) => {
    try {
        const res = await axios.post(`${URL}services`, payload)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const delAncillary = createAsyncThunk(DEL_ANCILLARY, async (payload) => {
    try {
        console.log(payload.id)
        const res = await axios.delete(`${URL}services/${payload.id}`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const admin = createSlice({
    name: "ADMIN",
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
        },
    }
})


export const admins = admin.reducer
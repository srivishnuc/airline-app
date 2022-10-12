import { admin_services as initialState } from "../initialState"
import { ADMIN_SERVICES, PASSENGER_LIST } from "../actionTypes"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getServices = createAsyncThunk(ADMIN_SERVICES, async (payload) => {
    try {
        const res = await axios.get(`http://localhost:3006/services`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const getPassengers = createAsyncThunk(PASSENGER_LIST, async (payload) => {
    try {
        const res = await axios.get(`http://localhost:3006/passengers`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const admin = createSlice({
    name: 'ADMIN',
    initialState,
    reducers: {},
    extraReducers: {
        [getServices.fulfilled]: (state, { payload }) => {
            state.services = payload;
        },
        [getServices.rejected]: () => {
            state.services = [];
        },
        [getPassengers.fulfilled]: (state, { payload }) => {
            state.passengers = payload;
        },
        [getPassengers.rejected]: () => {
            state.passengers = [];
        },
    }
})


export const admins = admin.reducer
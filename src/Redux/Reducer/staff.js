import { staff_state as initialState } from "../initialState"
import { CHECKIN, IN_FLIGHT } from "../actionTypes"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getServices = createAsyncThunk(CHECKIN, async (payload) => {
    try {
        const res = await axios.get(`http://localhost:3006/services`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const getPassengers = createAsyncThunk(IN_FLIGHT, async (payload) => {
    try {
        const res = await axios.get(`http://localhost:3006/passengers`)
        return res.data;
    } catch (err) {
        console.log(err);
    }
})

export const staff = createSlice({
    name: "STAFF",
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
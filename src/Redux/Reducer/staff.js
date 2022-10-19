import { staff_state as initialState } from "../initialState"
import { CHECKIN, IN_FLIGHT } from "../actionTypes"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getCheckin = createAsyncThunk(CHECKIN, async (payload) => {
    try {
        const res = await axios.get(`http://localhost:3006/checkin`)
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
        [getCheckin.fulfilled]: (state, { payload }) => {
            state.checkin = payload;
        },
        [getCheckin.rejected]: (state) => {
            state.checkin = [];
        }        
    }
})


export const staffs = staff.reducer
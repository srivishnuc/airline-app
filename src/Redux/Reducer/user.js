import initialState from "../initialState"
import { USER_LOGIN } from "../actionTypes"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// const users = (InitialState = initialState, action) => {
//     switch (action.type) {
//         case USER_LOGIN:
//             return InitialState;
//         default:
//             return InitialState;
//     }
// }

// export const getUsers = createAsyncThunk(USER_LOGIN, async (payload) => {
//     console.log(payload)
//     try {
//         const res = await fetch(`http://localhost:3006/users?username=${payload.username}`).then(data => data.json())
//         return res
//     } catch (err) {
//         console.log(err)
//     }
// })

export const getUsers = createAsyncThunk(USER_LOGIN, async (payload) => {
    console.log(JSON.stringify(payload))
    try {
        const res = await fetch(`http://localhost:3006/users`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        console.log(data);
        return data
    } catch (err) {
        console.log(err)
    }
})


export const user = createSlice({
    name: 'USER',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.msg = 'Fetching data'
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.users = payload;
            state.msg = 'Success fetching data';
        },
        [getUsers.rejected]: (state) => {
            state.msg = 'Error fetching data'
        },
    }
})


export const users = user.reducer
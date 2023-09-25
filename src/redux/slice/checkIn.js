import { createSlice } from '@reduxjs/toolkit';

const checkIn = createSlice({
    name: 'checkIn',
    initialState: {
        date:{},
        name: null,
        error: null,
    },
    reducers: {
        checkInOk: (state, action) => {
           state.date = action.payload.date;
           state.name = action.payload.name;

        },
        checkInFail: (state, action) => {
            state.date = false;

            state.name = null;
            state.error = action.payload.error;

        },
        cancelCheckIn: (state) => {
            state.date = false;
            state.name = null;
            state.error = null;
        },
    },
});

export const { checkInOk, checkInFail, cancelCheckIn } = checkIn.actions;
export default checkIn.reducer;
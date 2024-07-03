import { createSlice } from '@reduxjs/toolkit';

const ownerSlice = createSlice({
    name: 'owner',
    initialState: {
        value: [{ name: 'joy' }],
    },
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload;
        // },

    },
});

export const { } = ownerSlice.actions;

export default ownerSlice.reducer;

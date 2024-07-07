import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dogs: {},
    loading: false,
    error: null,
};

const dogSlice = createSlice({
    name: "dog",
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.endsWith("/fetchDogById/fulfilled"),
                (state, action) => {
                    state.dogs = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/fetchDogById/rejected"),
                (state, action) => {
                    state.dogs = {};
                    state.loading = false;
                    state.error = action.error.message;
                }
            );
    },
});

export default dogSlice.reducer;

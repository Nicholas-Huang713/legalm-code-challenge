import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSingleDogFromApi } from "../../../services/api/api";

export const fetchDog = createAsyncThunk("dog/fetchDogById", async (dogId) => {
    try {
        const data = await fetchSingleDogFromApi(dogId);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch dogs");
    }
});

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
                    state.loading = false;
                    state.error = null;
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

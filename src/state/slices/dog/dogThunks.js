import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleDogFromApi } from '../../../services/api/api';

export const fetchDog = createAsyncThunk("dog/fetchDogById", async (dogId) => {
    try {
        const data = await fetchSingleDogFromApi(dogId);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch dogs");
    }
});
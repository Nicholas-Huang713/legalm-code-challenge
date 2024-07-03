import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOwnersFromApi } from '../../../services/api/api';

export const fetchOwners = createAsyncThunk('owner/fetchOwners', async () => {
    try {
        const data = await fetchOwnersFromApi();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch owners');
    }
});

const initialState = {
    owners: [],
    loading: false,
    error: null,
};

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    state.owners = action.payload.owners;
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.owners = [];
                    state.loading = false;
                    state.error = action.error.message;
                }
            );

        // .addCase(fetchOwners.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // })
        // .addCase(fetchOwners.fulfilled, (state, action) => {
        //     state.owners = action.payload.owners;
        //     state.loading = false;
        //     state.error = null;
        // })
        // .addCase(fetchOwners.rejected, (state, action) => {
        //     state.owners = [];
        //     state.loading = false;
        //     state.error = action.error.message;
        // });
    },
});

// export const { } = ownerSlice.actions;

export default ownerSlice.reducer;

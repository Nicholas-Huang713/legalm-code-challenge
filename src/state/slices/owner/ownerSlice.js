import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOwnersFromApi, addOwnerToAPi } from '../../../services/api/api';

export const fetchOwners = createAsyncThunk('owner/fetchOwners', async () => {
    try {
        const data = await fetchOwnersFromApi();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch owners');
    }
});

export const addOwners = createAsyncThunk('owner/addOwners', async (owner) => {
    try {
        const data = await addOwnerToAPi(owner);
        console.log("ownerList in redux:", data)
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
            .addMatcher((action) => action.type.endsWith('Owners/fulfilled'),
                (state, action) => {
                    state.owners = action.payload.owners;
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher((action) => action.type.endsWith('Owners/rejected'),
                (state, action) => {
                    state.owners = [];
                    state.loading = false;
                    state.error = action.error.message;
                }
            )

        // .addCase(fetchOwners.pending, (state) => {
        //     state.status = 'loading';
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
        // })
        // .addCase(addOwners.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(addOwners.fulfilled, (state, action) => {
        //     state.owners = action.payload.owners;
        //     state.loading = false;
        //     state.error = null;
        // })
        // .addCase(addOwners.rejected, (state, action) => {
        //     state.owners = [];
        //     state.loading = false;
        //     state.error = action.error.message;
        // })
    },
});

// export const { updateOwners } = ownerSlice.actions;

export default ownerSlice.reducer;

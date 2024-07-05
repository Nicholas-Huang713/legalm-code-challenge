import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOwnersFromApi, addOwnerToAPi, editOwnerInApi, deleteOwnerInApi } from '../../../services/api/api';

export const fetchOwners = createAsyncThunk('owner/fetchOwners', async () => {
    try {
        const data = await fetchOwnersFromApi();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch owners');
    }
});

export const addOwner = createAsyncThunk('owner/addOwners', async (owner) => {
    try {
        const data = await addOwnerToAPi(owner);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch owners');
    }
});

export const editOwner = createAsyncThunk('owner/editOwners', async (owner) => {
    try {
        const data = await editOwnerInApi(owner);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch owners');
    }
});

export const deleteOwner = createAsyncThunk('owner/deleteOwners', async (ownerId) => {
    try {
        const data = await deleteOwnerInApi(ownerId);
        return data;
    } catch (error) {
        throw new Error('Failed to delete owner');
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
    },
});

// export const { } = ownerSlice.actions;
export default ownerSlice.reducer;

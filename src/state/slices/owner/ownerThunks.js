import { createAsyncThunk } from '@reduxjs/toolkit';
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
        throw new Error('Failed to add owner');
    }
});

export const editOwner = createAsyncThunk('owner/editOwners', async (owner) => {
    try {
        const data = await editOwnerInApi(owner);
        return data;
    } catch (error) {
        throw new Error('Failed to edit owner');
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

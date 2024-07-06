import { createSlice } from '@reduxjs/toolkit';

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

export default ownerSlice.reducer;

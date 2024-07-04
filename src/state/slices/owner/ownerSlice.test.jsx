import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ownerReducer, { fetchOwners } from './ownerSlice'; 
import dogReducer, { fetchDog } from '../dog/dogSlice'; 
import OwnerList from '../../../pages/OwnerList/OwnerList';

const owners = [
    { id: 1, name: "Alice", exp: 10, dogId: 1 },
    { id: 2, name: "Bob", exp: 5, dogId: 2 },
    { id: 3, name: "Jerry", exp: 3, dogId: 3 },
];

const dogs = {
    dog: { id: 1, name: 'Oscar', food: 'apples', ownerId: 1 },
    owners: [{id: 1, name: 'Alice', exp: 10, dogId: 1}]
};

vi.mock('../../../services/api/api', () => ({
    fetchOwnersFromApi: vi.fn(() => Promise.resolve({ owners })),
    fetchSingleDogFromApi: vi.fn(() => Promise.resolve({ dogs })),
}));

describe('Owner Slice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                owner: ownerReducer,
                dog: dogReducer,
            },
        });
    });

    it('fetchOwners async thunk and reducers work correctly', async () => {
        await store.dispatch(fetchOwners());
        const state = store.getState();
        expect(state.owner.owners).toHaveLength(3); 
        expect(state.owner.owners[0].name).toEqual('Alice');
        expect(state.owner.loading).toEqual(false);
        expect(state.owner.error).toBeNull();
    });

    it('renders component with fetched owners', async () => {
        await store.dispatch(fetchOwners());
        await store.dispatch(fetchDog());
        render(
            <Provider store={store}>
                <OwnerList /> 
            </Provider>
        );
        expect(screen.getByText('Alice')).toBeInTheDocument();
    });
});


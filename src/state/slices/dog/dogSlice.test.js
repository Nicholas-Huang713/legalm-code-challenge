import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from '../owner/ownerSlice';
import dogReducer from "./dogSlice";
import { fetchDog } from "./dogThunks";
import { fetchOwners } from "../owner/ownerThunks";

describe("Dog Slice", () => {
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                owner: ownerReducer,
                dog: dogReducer,
            },
        });
    });

    it("fetchDogs async thunk and reducers work correctly", async () => {
        await store.dispatch(fetchOwners());
        const state = store.getState();
        const dogIdToRetrieve = state.owner.owners[0].dogId;
        await store.dispatch(fetchDog(dogIdToRetrieve));
        const updatedState = store.getState();
        expect(updatedState.dog.dogs.dog.name).toEqual("Marshmallow")
        expect(updatedState.dog.dogs.owners).toHaveLength(1);
    });

});

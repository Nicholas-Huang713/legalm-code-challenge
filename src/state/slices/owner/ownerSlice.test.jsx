import { configureStore } from "@reduxjs/toolkit";
import ownerReducer from "./ownerSlice";
import { fetchOwners, addOwner, editOwner, deleteOwner } from "./ownerThunks";
import dogReducer from "../dog/dogSlice";
import { newOwner } from "../../../test/mocks/mockValues";
import { expect } from "vitest";

describe("Owner Slice", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        owner: ownerReducer,
        dog: dogReducer,
      },
    });
  });

  it("fetchOwners adds owners to state", async () => {
    await store.dispatch(fetchOwners());
    const state = store.getState();
    expect(state.owner.owners).toHaveLength(3);
    expect(state.owner.owners[0].name).toEqual("Alice");
    expect(state.owner.loading).toEqual(false);
    expect(state.owner.error).toBeNull();
  });

  it("addOwner adds to current state", async () => {
    await store.dispatch(addOwner(newOwner));
    const state = store.getState();
    expect(state.owner.owners).toHaveLength(4);
  });

  it("editOwner adds to current state", async () => {
    await store.dispatch(fetchOwners());
    const state = store.getState();
    const ownerToEdit = state.owner.owners[0];
    await store.dispatch(
      editOwner({ owner: { ...ownerToEdit, name: "McDonald" } })
    );
    const updatedStore = store.getState();
    const edittedName = updatedStore.owner.owners[0].name;
    expect(edittedName).toEqual("McDonald");
  });

  it("deleteOwner removes from current state", async () => {
    await store.dispatch(fetchOwners());
    const state = store.getState();
    const ownerIdToEdit = state.owner.owners[0].id;
    await store.dispatch(deleteOwner(ownerIdToEdit));
    const updatedStore = store.getState();

    expect(updatedStore.owner.owners).toHaveLength(2);
  });
});

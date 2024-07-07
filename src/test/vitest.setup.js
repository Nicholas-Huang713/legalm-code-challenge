import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { makeServer } from '../services/mirage';
import dogReducer from '../state/slices/dog/dogSlice';
import ownerReducer from "../state/slices/owner/ownerSlice";
import { configureStore } from "@reduxjs/toolkit";
import { seeds } from '../services/mirage/seeds';

let server;
let store;

beforeEach(() => {
    server = makeServer({ environment: "test" });
    store = configureStore({
        reducer: {
            owner: ownerReducer,
            dog: dogReducer,
        },
    });
    seeds(server);
});

afterEach(() => {
    cleanup();
    server.shutdown();
})

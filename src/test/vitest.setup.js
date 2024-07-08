import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { makeServer } from '../services/mirage';
import { seeds } from '../services/mirage/seeds';

let server;

beforeEach(() => {
    server = makeServer({ environment: "test" });
    seeds(server);
});

afterEach(() => {
    cleanup();
    server.shutdown();
})

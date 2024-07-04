import { render, screen } from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import App from './App';

const renderApp = () => render(<App />)
describe('app', () => {
    it("component renders", () => {
        // renderApp();
    })
})
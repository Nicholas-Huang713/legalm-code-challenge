import { rest } from 'msw';

export const handlers = [
    // rest.get('/api/owners', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to fetch owners' }));
    // }),
    // rest.get('/api/owners/:id', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to fetch single owner' }));
    // }),
    // rest.post('/api/owners/new', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to create owner' }));
    // }),
    // rest.put('/api/owners/edit', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to edit owner' }));
    // }),
    // rest.delete('/api/owners/delete/:id', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to delete owner' }));
    // }),
    // rest.get('/api/dogs', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to fetch dogs' }));
    // }),
    // rest.get('/dogs/:id', (req, res, ctx) => {
    //     return res(ctx.status(500), ctx.json({ error: 'Failed to fetch single dog' }));
    // }),
];

import { v4 as uuidv4 } from 'uuid';

export function routes() {
    this.namespace = 'api';

    this.get('/owners', (schema) => {
        return schema.owners.all();
    });

    this.get('/owners/:id', (schema, req) => {
        const id = req.params.id;
        return schema.owners.find(id);
    });

    this.post('/owners/new', (schema, req) => {
        const ownerData = JSON.parse(req.requestBody);
        const { dog, owner } = ownerData;
        const ownerDataWithId = { id: uuidv4(), ...owner };
        const createdOwner = schema.owners.create(ownerDataWithId);
        schema.dogs.create({ ...dog, owner: createdOwner });
        return schema.owners.all();
    });

    this.get('/dogs', (schema) => {
        return schema.dogs.all();
    });

    this.get('/dogs/:id', (schema, req) => {
        const id = req.params.id;
        return schema.dogs.find(id);
    });

    this.put('/owners/edit/', (schema, request) => {
        let ownerData = JSON.parse(request.requestBody);
        const ownerToUpdate = schema.owners.find(ownerData.owner.id);
        ownerToUpdate.update(ownerData.owner);
        return schema.owners.all();
    });

    this.delete('/owners/delete/:id', (schema, request) => {
        let id = request.params.id;
        schema.owners.find(id).destroy();
        return schema.owners.all();
    });
}

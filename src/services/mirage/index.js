import { createServer, Model, belongsTo, Serializer } from 'miragejs';
import { v4 as uuidv4 } from 'uuid';

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,

        models: {
            owner: Model.extend({
                dog: belongsTo()
            }),

            dog: Model.extend({
                owner: belongsTo()
            })

        },
        serializers: {
            application: Serializer.extend({
                embed: false,
                include: ['dog', 'owner'],
            }),
        },

        seeds(server) {
            const ownerData = [
                { id: uuidv4(), name: "Alice", age: 30 },
                { id: uuidv4(), name: "Bob", age: 25 },
                { id: uuidv4(), name: "Jerry", age: 25 },
            ];
            const dogData = [
                { id: uuidv4(), name: "Marshmallow", food: "apples", img: "https://images.dog.ceo/breeds/terrier-irish/n02093991_1315.jpg" },
                { id: uuidv4(), name: "Peanut", food: "peanut butter", img: "https://images.dog.ceo/breeds/hound-plott/hhh_plott002.jpg" },
                { id: uuidv4(), name: "Biscuit", food: "beef", img: "https://images.dog.ceo/breeds/terrier-irish/n02093991_4711.jpg" },
            ]
            ownerData.forEach((owner, index) => {
                const createdOwner = server.create("owner", owner);
                server.create('dog', { ...dogData[index], owner: createdOwner })
            })
        },

        routes() {
            this.namespace = "api";

            this.get("/owners", (schema) => {
                return schema.owners.all();
            });

            this.get('/owners/:id', (schema, request) => {
                let id = request.params.id;
                return schema.owners.find(id);
            });

            this.get('/dogs', (schema) => {
                return schema.dogs.all();
            });

            this.get('/dogs/:id', (schema, req) => {
                let id = req.params.id;
                return schema.dogs.find(id);
            });


            // this.post("/users", (schema, request) => {
            //     let attrs = JSON.parse(request.requestBody);
            //     return schema.users.create(attrs);
            // });



        },
    });

    return server;
}

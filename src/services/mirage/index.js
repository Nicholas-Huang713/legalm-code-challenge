import { createServer, Model, belongsTo, Serializer } from "miragejs";
import { v4 as uuidv4 } from "uuid";

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,

        models: {
            owner: Model.extend({
                dog: belongsTo(),
            }),
            dog: Model.extend({
                owner: belongsTo(),
            }),
        },

        serializers: {
            application: Serializer.extend({
                embed: false,
                include: ["dog", "owner"],
            }),
        },

        seeds(server) {
            const ownerData = [
                { id: uuidv4(), name: "Alice", exp: 10 },
                { id: uuidv4(), name: "Bob", exp: 5 },
                { id: uuidv4(), name: "Jerry", exp: 3 },
            ];
            const dogData = [
                {
                    id: uuidv4(),
                    name: "Marshmallow",
                    food: "apples",
                    img: "https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg",
                },
                {
                    id: uuidv4(),
                    name: "Peanut",
                    food: "peanut butter",
                    img: "https://images.dog.ceo/breeds/terrier-norwich/n02094258_1220.jpg",
                },
                {
                    id: uuidv4(),
                    name: "Biscuit",
                    food: "beef",
                    img: "https://images.dog.ceo/breeds/pyrenees/n02111500_7194.jpg",
                },
            ];
            ownerData.forEach((owner, index) => {
                const createdOwner = server.create("owner", owner);
                server.create("dog", { ...dogData[index], owner: createdOwner });
            });
        },

        routes() {
            this.namespace = "api";

            this.get("/owners", (schema) => {
                return schema.owners.all();
            });

            this.get("/owners/:id", (schema, req) => {
                const id = req.params.id;
                return schema.owners.find(id);
            });

            this.post("/owners/new", (schema, req) => {
                console.log("new owner api called")
                const ownerData = JSON.parse(req.requestBody);
                const { dog, owner } = ownerData;
                const ownerDataWithId = { id: uuidv4(), ...owner };
                const createdOwner = schema.owners.create(ownerDataWithId);
                schema.dogs.create({ ...dog, owner: createdOwner });
                return schema.owners.all();
            });

            this.get("/dogs", (schema) => {
                return schema.dogs.all();
            });

            this.get("/dogs/:id", (schema, req) => {
                const id = req.params.id;
                return schema.dogs.find(id);
            });
        },
    });

    return server;
}

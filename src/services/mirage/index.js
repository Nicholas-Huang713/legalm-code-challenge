// src/mirage/index.js
import { createServer, Model } from 'miragejs';

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", { id: 1, name: "Alice", age: 30 });
            server.create("user", { id: 2, name: "Bob", age: 25 });
        },

        routes() {
            this.namespace = "api";

            this.get("/users", (schema) => {
                return schema.users.all();
            });

            this.post("/users", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                return schema.users.create(attrs);
            });
        },
    });

    return server;
}

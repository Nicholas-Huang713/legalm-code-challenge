import { createServer } from "miragejs";
import { models } from './models';
import { seeds } from './seeds';
import { serializers } from './serializers';
import { routes } from './routes';

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,
        models,
        serializers,
        seeds,
        routes,
    });

    return server;
}

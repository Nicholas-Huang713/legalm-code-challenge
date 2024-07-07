import { Model, belongsTo } from 'miragejs';

export const models = {
    owner: Model.extend({
        dog: belongsTo(),
    }),
    dog: Model.extend({
        owner: belongsTo(),
    }),
};

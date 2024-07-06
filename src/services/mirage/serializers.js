import { Serializer } from 'miragejs';

export const serializers = {
    application: Serializer.extend({
        embed: false,
        include: ['dog', 'owner'],
    }),
};

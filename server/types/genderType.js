const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const GenderType = new GraphQLObjectType({
    name: 'Gender',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});

module.exports = GenderType;
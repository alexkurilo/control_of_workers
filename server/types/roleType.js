const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});

module.exports = RoleType;

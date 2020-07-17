const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLFloat,
} = require('graphql');

const SalaryType = new GraphQLObjectType({
    name: 'Salary',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        size: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
    }),
});

module.exports = SalaryType;
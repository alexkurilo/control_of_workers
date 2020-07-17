const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');

const Query = require('../queries/indexQuery');
const Mutation = require('../mutations/indexMutation');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType(Query),
    mutation: new GraphQLObjectType(Mutation),
});

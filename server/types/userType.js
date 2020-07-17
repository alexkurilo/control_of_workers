const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const WorkerType = require('./workerType');
const RoleType = require('./roleType');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        passwordHash: {
            type: new GraphQLNonNull(GraphQLString),
        },
        worker: {
            type: WorkerType,
            resolve(parent, args) {

                return parent.workerId ? Workers.findById(parent.workerId) : null;
            },
        },
        role: {
            type: RoleType,
            resolve(parent, args) {

                return parent.roleId ? Roles.findById(parent.roleId) : null;
            },
        },
    }),
});

module.exports = UserType;
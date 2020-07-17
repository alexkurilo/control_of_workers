const {
    GraphQLList,
    GraphQLID,
} = require('graphql');

const RoleType = require('../types/roleType');
const Roles = require('../models/role');

const role = {
    type: RoleType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Roles.findById(args.id);
    },
};

const roles = {
    type: new GraphQLList(RoleType),
    resolve(parent, args) {
        return Roles.find({});
    }
};

module.exports = { role, roles };
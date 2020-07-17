const {
    GraphQLList,
    GraphQLID,
} = require('graphql');

const UserType = require('../types/userType');
const Users = require('../models/user');

const user = {
    type: UserType,
        args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Users.findById(args.id);
    },
};

const users = {
    type: new GraphQLList(UserType),
        resolve(parent, args) {
        return Users.find({});
    }
};

module.exports = { user, users };
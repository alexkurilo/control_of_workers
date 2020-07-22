const {
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql');

const UserType = require('../types/userType');
const Users = require('../models/user');
const Roles = require('../models/role');

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

const compareUserData = {
    type: UserType,
    args: {
        email: {
            type: GraphQLString,
        },
        passwordHash: {
            type: GraphQLString,
        }
    },
    resolve(parent, args) {

        return Users.findOne({
            email: args.email,
            passwordHash: args.passwordHash
        });
    },
};

module.exports = { user, users, compareUserData };
const {
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql');
const bcrypt = require('bcrypt');

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
        password: {
            type: GraphQLString,
        }
    },
    async resolve(parent, args) {
        const user = await Users.findOne({
            email: args.email,
        });
        const isMatch = await bcrypt.compareSync(args.password, user.passwordHash);

        return isMatch ? user : null;
    },
};

module.exports = { user, users, compareUserData };
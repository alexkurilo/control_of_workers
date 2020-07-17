const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const UserType = require('../types/userType');
const Users = require('../models/user');

const addUser = {
    type: UserType,
        args: {
        login: {
            type: new GraphQLNonNull(GraphQLString),
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        passwordHash: {
            type: new GraphQLNonNull(GraphQLString),
        },
        workerId: {
            type: new GraphQLNonNull(GraphQLString),
        },
        roleId: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        const user = new Users({
            login: args.login,
            email: args.email,
            passwordHash: args.passwordHash,
            workerId: args.workerId,
            roleId: args.roleId,
        });

        return user.save();
    },
};

const removeUser = {
    type: UserType,
        args: {
        id: {
            type: GraphQLID,
        },
    },
    async resolve(parent, args) {

        return Users.findByIdAndRemove(args.id);
    }
};

const updateUser = {
    type: UserType,
        args: {
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
        workerId: {
            type: new GraphQLNonNull(GraphQLString),
        },
        roleId: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        return Users.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    login: args.login,
                    email: args.email,
                    passwordHash: args.passwordHash,
                    workerId: args.workerId,
                    roleId: args.roleId,
                },
            },
            {
                new: true,
            },
        );
    }
};

module.exports = {addUser, removeUser, updateUser};
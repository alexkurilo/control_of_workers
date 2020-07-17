const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const RoleType = require('../types/roleType');
const Roles = require('../models/role');

const addRole = {
    type: RoleType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        const role = new Roles({
            name: args.name,
        });

        return role.save();
    },
};

const removeRole = {
    type: RoleType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    async resolve(parent, args) {

        return Roles.findByIdAndRemove(args.id);
    }
};

const updateRole = {
    type: RoleType,
    args: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        return Roles.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    name: args.name,
                },
            },
            {
                new: true,
            },
        );
    }
};

module.exports = { addRole, removeRole, updateRole };
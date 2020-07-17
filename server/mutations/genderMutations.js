const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const GenderType = require('../types/genderType');
const Genders = require('../models/gender');

const addGender = {
    type: GenderType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        const gender = new Genders({
            name: args.name,
        });

        return gender.save();
    },
};

const removeGender = {
    type: GenderType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    async resolve(parent, args) {

        return Genders.findByIdAndRemove(args.id);
    }
};

const updateGender = {
    type: GenderType,
    args: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        return Genders.findByIdAndUpdate(
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

module.exports = { addGender, removeGender, updateGender };
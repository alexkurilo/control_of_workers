const {
    GraphQLList,
    GraphQLID,
} = require('graphql');

const GenderType = require('../types/genderType');
const Genders = require('../models/gender');

const gender = {
    type: GenderType,
        args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Genders.findById(args.id);
    },
};

const genders = {
    type: new GraphQLList(GenderType),
        resolve(parent, args) {
        return Genders.find({});
    }
};

module.exports = { gender, genders };
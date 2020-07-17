const {
    GraphQLList,
    GraphQLID,
} = require('graphql');

const PositionType = require('../types/positionType');
const Positions = require('../models/position');

const position = {
    type: PositionType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Positions.findById(args.id);
    },
};

const positions = {
    type: new GraphQLList(PositionType),
    resolve(parent, args) {
        return Positions.find({});
    }
};

module.exports = { position, positions };
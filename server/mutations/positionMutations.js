const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const PositionType = require('../types/positionType');
const Positions = require('../models/position');

const addPosition = {
    type: PositionType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        const position = new Roles({
            name: args.name,
        });

        return position.save();
    },
};

const removePosition = {
    type: PositionType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    async resolve(parent, args) {

        return Positions.findByIdAndRemove(args.id);
    }
};

const updatePosition = {
    type: PositionType,
    args: {
        id: {
            type: GraphQLID,
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        return Positions.findByIdAndUpdate(
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

module.exports = { addPosition, removePosition, updatePosition };
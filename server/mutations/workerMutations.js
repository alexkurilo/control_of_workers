const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const WorkerType = require('../types/workerType');
const Workers = require('../models/worker');

const addWorker = {
    type: WorkerType,
    args: {
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: GraphQLString,
        },
        surName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        genderId: {
            type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString),
        },
        date: {
            type: new GraphQLNonNull(GraphQLString),
        },
        salaryId: {
            type: new GraphQLNonNull(GraphQLString),
        },
        positionId: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        const worker = new Workers({
            firstName: args.firstName,
            lastName: args.lastName,
            surName: args.surName,
            genderId: args.genderId,
            phone: args.phone,
            date: args.date,
            salaryId: args.salaryId,
            positionId: args.positionId,
        });

        return worker.save();
    },
};

const removeWorker = {
    type: WorkerType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    async resolve(parent, args) {

        return Workers.findByIdAndRemove(args.id);
    }
};

const updateWorker = {
    type: WorkerType,
    args: {
        id: {
            type: GraphQLID,
        },
        firstName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        lastName: {
            type: GraphQLString,
        },
        surName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        genderId: {
            type: new GraphQLNonNull(GraphQLString),
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString),
        },
        date: {
            type: new GraphQLNonNull(GraphQLString),
        },
        salaryId: {
            type: new GraphQLNonNull(GraphQLString),
        },
        positionId: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve(parent, args) {
        return Workers.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    surName: args.surName,
                    genderId: args.genderId,
                    phone: args.phone,
                    date: args.date,
                    salaryId: args.salaryId,
                    positionId: args.positionId,
                },
            },
            {
                new: true,
            },
        );
    }
};

module.exports = {addWorker, removeWorker, updateWorker};
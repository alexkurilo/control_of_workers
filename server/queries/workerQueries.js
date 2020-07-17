const {
    GraphQLList,
    GraphQLID,
} = require('graphql');

const WorkerType = require('../types/workerType');
const Workers = require('../models/worker');

const worker = {
    type: WorkerType,
        args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Workers.findById(args.id);
    },
};

const workers = {
    type: new GraphQLList(WorkerType),
        resolve(parent, args) {
        return Workers.find({});
    }
};

module.exports = { worker, workers };
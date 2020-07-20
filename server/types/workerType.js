const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const PositionType = require('./positionType');
const GenderType = require('./genderType');
const SalaryType = require('./salaryType');
const Positions = require('../models/position');
const Salaries = require('../models/salary');
const Genders = require('../models/gender');

const WorkerType = new GraphQLObjectType({
    name: 'Worker',
    fields: () => ({
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
        gender: {
            type: GenderType,
            resolve(parent, args) {

                return parent.genderId ? Genders.findById(parent.genderId) : null;
            },
        },
        phone: {
            type: new GraphQLNonNull(GraphQLString),
        },
        date: {
            type: new GraphQLNonNull(GraphQLString),
        },
        salary: {
            type: SalaryType,
            resolve(parent, args) {

                return parent.salaryId ? Salaries.findById(parent.salaryId) : null;
            },
        },
        position: {
            type: PositionType,
            resolve(parent, args) {

                return parent.positionId ? Positions.findById(parent.positionId) : null;
            },
        },
    }),
});

module.exports = WorkerType;
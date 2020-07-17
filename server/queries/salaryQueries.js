const {
    GraphQLList,
    GraphQLID,
} = require('graphql');

const SalaryType = require('../types/salaryType');
const Salaries = require('../models/salary');

const salary = {
    type: SalaryType,
        args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return Salaries.findById(args.id);
    },
};

const salaries = {
    type: new GraphQLList(SalaryType),
        resolve(parent, args) {
        return Salaries.find({});
    }
};

module.exports = { salary, salaries };
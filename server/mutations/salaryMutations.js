const {
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLID,
} = require('graphql');

const SalaryType = require('../types/salaryType');
const Salaries = require('../models/salary');

const addSalary = {
    type: SalaryType,
    args: {
        size: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
    },
    resolve(parent, args) {
        const salary = new Roles({
            size: args.size,
        });

        return salary.save();
    },
};

const removeSalary = {
    type: SalaryType,
    args: {
        id: {
            type: GraphQLID,
        },
    },
    async resolve(parent, args) {

        return Salaries.findByIdAndRemove(args.id);
    }
};

const updateSalary = {
    type: SalaryType,
    args: {
        id: {
            type: GraphQLID,
        },
        size: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
    },
    resolve(parent, args) {
        return Salaries.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    size: args.size,
                },
            },
            {
                new: true,
            },
        );
    }
};

module.exports = { addSalary, removeSalary, updateSalary };
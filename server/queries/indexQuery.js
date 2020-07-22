const { user, users, compareUserData } = require('./userQueries');
const { worker, workers } = require('./workerQueries');
const { gender, genders } = require('./genderQueries');
const { role, roles } = require('./roleQueries');
const { salary, salaries } = require('./salaryQueries');
const { position, positions } = require('./positionQueries');

const Query = {
    name: 'IndexQuery',
    fields: {
        user,
        users,
        compareUserData,
        worker,
        workers,
        gender,
        genders,
        role,
        roles,
        salary,
        salaries,
        position,
        positions,
    }
};

module.exports = Query;
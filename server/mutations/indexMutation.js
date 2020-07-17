const { addUser, removeUser, updateUser } = require('./userMutations');
const { addWorker, removeWorker, updateWorker } = require('./workerMutations');
const { addGender, removeGender, updateGender } = require('./genderMutations');
const { addRole, removeRole, updateRole } = require('./roleMutations');
const { addSalary, removeSalary, updateSalary } = require('./salaryMutations');
const { addPosition, removePosition, updatePosition } = require('./positionMutations');

const Mutation = {
    name:'IndexMutation',
    fields: {
        addUser,
        removeUser,
        updateUser,
        addWorker,
        removeWorker,
        updateWorker,
        addGender,
        removeGender,
        updateGender,
        addRole,
        removeRole,
        updateRole,
        addSalary,
        removeSalary,
        updateSalary,
        addPosition,
        removePosition,
        updatePosition,
    },
};

module.exports = Mutation;
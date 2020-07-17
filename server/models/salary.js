const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salarySchema = new Schema({
    size: Number,
});

module.exports = mongoose.model('Salary', salarySchema);
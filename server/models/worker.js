const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    firstName: String,
    lastName: String,
    genderId: String,
    phone: Number,
    date: Date,
    salaryId: String,
    positionId: String,
});

module.exports = mongoose.model('Worker', workerSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: String,
    email: String,
    passwordHash: String,
    workerId: String,
    roleId: String,
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userType = new mongoose.Schema({
    email: String,
    userName: String,
    password: String,
})

const user = mongoose.model("user", userType);
module.exports = user;
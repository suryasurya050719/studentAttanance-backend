const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherName:String,
    email:String,
    subject:String,
    aadharNo: String,
    bloodGroup: String,
    dateOfBirth: String,
    profilePic: String,
    community: String,
    birthCertificate: String,
    address: String,
    mobileNo: String
})


const teacher = mongoose.model("teacher", teacherSchema);
module.exports = teacher;
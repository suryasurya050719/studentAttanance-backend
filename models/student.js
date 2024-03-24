const mongoose = require('mongoose');

const studentType = new mongoose.Schema({
    userName: String,
    email: String,
    rollNo: String,
    classSection: String,
    aadharNo: String,
    bloodGroup: String,
    dateOfBirth: String,
    profilePic: String,
    community: String,
    birthCertificate: String,
    address: String,
    fatherName: String,
    motherName: String,
    fatherOccupation: String,
    gordianName: String,
    gordianOccupation: String,
    salary: String,
    residentialAddress: String,
    mobileNo: String,
    transport: String,
    scar: String,
    mole: String,
})

const student = mongoose.model("student", studentType);
module.exports = student;
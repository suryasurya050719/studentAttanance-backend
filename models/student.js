const mongoose = require('mongoose');
const mongooseSequenece = require('mongoose-sequence')

const studentType = new mongoose.Schema({
    userName: String,
    email: String,
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
    guardianName: String,
    guardianOccupation: String,
    salary: String,
    residentialAddress: String,
    mobileNo: String,
    transport: String,
    scar: String,
    mole: String,
})

if(!mongoose.model?.student){
    studentType.plugin(mongooseSequenece(mongoose),{inc_field:"rollNo",start_seq: 100000})
}

const student = mongoose.model("student", studentType);
module.exports = student;
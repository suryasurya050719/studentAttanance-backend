const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driverName:String,
    email:String,
    aadharNo: String,
    bloodGroup: String,
    dateOfBirth: String,
    profilePic: String,
    address: String,
    mobileNo: String,
    licenseNumber: String,
    insuranceNumber: String,
    busRegNumber : String,
    fitnessCertificate : String

})


const driver = mongoose.model("driver", driverSchema);
module.exports = driver;
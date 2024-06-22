const Joi = require('@hapi/joi')

module.exports = {
    studentSchema : Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        classSection: Joi.string().required(),
        aadharNo: Joi.string().pattern(new RegExp('^[0-9]{12}$')).required(),
        bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required(),
        dateOfBirth: Joi.string().required(),
        community: Joi.string().required(),
        address: Joi.string().required(),
        fatherName: Joi.string().required(),
        motherName: Joi.string().required(),
        fatherOccupation: Joi.string().required(),
        guardianName: Joi.string().required(),
        guardianOccupation: Joi.string().required(),
        salary: Joi.string().required(),
        residentialAddress: Joi.string().required(),
        mobileNo: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        transport: Joi.string().required(),
        scar: Joi.string().allow(''),
        mole: Joi.string().allow('')
    }),
    teacherSchema: Joi.object({
        teacherName: Joi.string().required(),
        email: Joi.string().email().required(),
        subject: Joi.string().required(),
        aadharNo: Joi.string().pattern(new RegExp('^[0-9]{12}$')).required(),
        bloodGroup:  Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required(),
        dateOfBirth: Joi.string().required(),
        community: Joi.string().required(),
        address: Joi.string().required(),
        mobileNo: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required()
    }),
        driverSchema : Joi.object({
            driverName: Joi.string().min(1).required(),
            email: Joi.string().email().required(),
            aadharNo: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
            bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required(),
            dateOfBirth: Joi.string().required(),
            address: Joi.string().min(1).required(),
            mobileNo: Joi.string().pattern(/^[0-9]{10}$/).required(),
            licenseNumber: Joi.string().min(1).required(),
            insuranceNumber: Joi.string().min(1).required(),
            busRegNumber: Joi.string().min(1).required(),
            fitnessCertificate: Joi.string().min(1).required()
        })
}
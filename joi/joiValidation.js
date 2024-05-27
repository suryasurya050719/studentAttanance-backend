const Joi = require('@hapi/joi')

module.exports = {
    studentSchema : Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        classSection: Joi.string().required(),
        aadharNo: Joi.string().pattern(new RegExp('^[0-9]{12}$')).required(),
        bloodGroup: Joi.string().required(),
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
    })
}
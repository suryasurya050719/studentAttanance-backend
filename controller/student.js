var express = require("express");
var router = express.Router();
const studentDetail = require("../models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configuration");
const returnRes = require("../utilities/responseHandler");
const { studentSchema } = require('../joi/joiValidation')
const { uploadFile } = require('../utilities/uploadFile')


module.exports = {
    Create: async function (req, res) {
        try {
            const body = req.body;
            await studentSchema.validateAsync(req.body)
            if ( !req.files || !req.files.profilePic || !req.files.birthCertificate || (req.files.profilePic.length == 0) || (req.files.birthCertificate.length == 0)) {
                return returnRes(res, 422, false, "please fill the required media field");
            }
            const { profilePic, birthCertificate } = req.files
            if (profilePic[0].mimetype != 'image/jpeg' || birthCertificate[0].mimetype != `application/pdf`) {
                return returnRes(res, 422, false, "Invalid media type");
            }
            body.profilePic = await uploadFile(profilePic[0])
            body.birthCertificate = await uploadFile(birthCertificate[0])
            studentDetail.create(body, async (err, register) => {
                if (err) {
                    return returnRes(res, 400, false, "student Not Created ", err);
                } else {
                    return returnRes(res, 200, true, "student Created Successfully", register);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something went wrong!", error);
        }
    },
    Get: async function (req, res) {
        try {
            studentDetail.find(function (err, studentDetail) {
                if (err) {
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    return returnRes(res, 200, true, "List Generated", studentDetail);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    }
};

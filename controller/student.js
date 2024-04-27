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
            studentSchema.validate(req.body)
            const { profilePic, birthCertificate } = req.files
            console.log(!profilePic || !birthCertificate || (profilePic.length == 0) || (birthCertificate.length == 0))
            if (!profilePic || !birthCertificate || (profilePic.length == 0) || (birthCertificate.length == 0)) {
                return returnRes(res, 422, false, "please fill the required media field");
            }
            if (profilePic[0].mimetype != 'image/jpeg' || birthCertificate[0].mimetype != `application/pdf`) {
                return returnRes(res, 422, false, "Invalid media type");
            }
            body.profilePic = await uploadFile(profilePic[0])
            body.birthCertificate = await uploadFile(birthCertificate[0])
            studentDetail.create(body, async (err, register) => {
                if (err) {
                    return returnRes(res, 200, false, "student Not Created ", err);
                } else {
                    return returnRes(res, 200, true, "student Created Successfully", register);
                }
            });
        } catch (error) {
            console.log(error);
            return returnRes(res, 500, false, "Something went wrong!", err);
        }
    },
    Get: async function (req, res) {
        console.log("sdklk")
        try {
            studentDetail.find(function (err, studentDetail) {
                if (err) {
                    return returnRes(res, 200, false, "Something Went Wrong!");
                } else {
                    return returnRes(res, 200, true, "List Generated", studentDetail);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
};

var express = require("express");
var router = express.Router();
const teacherModel = require("../models/teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configuration");
const returnRes = require("../utilities/responseHandler");
const { teacherSchema } = require('../joi/joiValidation')
const { uploadFile } = require('../utilities/uploadFile')


module.exports = {
    Create: async function (req, res) {
        try {
            const body = req.body;
            await teacherSchema.validateAsync(req.body)
            if ( !req.files || !req.files.profilePic || !req.files.birthCertificate || (req.files.profilePic.length == 0) || (req.files.birthCertificate.length == 0)) {
                return returnRes(res, 422, false, "please fill the required media field");
            }
            const { profilePic, birthCertificate } = req.files
            if (profilePic[0].mimetype != 'image/jpeg' || birthCertificate[0].mimetype != `application/pdf`) {
                return returnRes(res, 422, false, "Invalid media type");
            }
            body.profilePic = await uploadFile(profilePic[0])
            body.birthCertificate = await uploadFile(birthCertificate[0])
            teacherModel.create(body, async (err, register) => {
                if (err) {
                    return returnRes(res, 400, false, "Teacher Not Created ", err);
                } else {
                    return returnRes(res, 200, true, "Teacher Created Successfully", register);
                }
            });
        } catch (error) {
            console.log(error);
            return returnRes(res, 500, false, "Something went wrong!", error);
        }
    },
    GetAll: async function (req, res) {
        console.log("sdklk")
        try {
            teacherModel.find(function (err, teacherModel) {
                if (err) {
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    return returnRes(res, 200, true, "List Generated", teacherModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
    Get: async function(req,res){
        try {
            console.log(req.params.id);
            teacherModel.findById({_id:req.params.id},function (err, teacherModel) {
                if (err) {
                    console.log(err);
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    return returnRes(res, 200, true, "Teacher Retrived", teacherModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
    Delete: async function(req,res){
        try {
            console.log(req.params.id);
            teacherModel.findByIdAndDelete({_id:req.params.id},function (err, teacherModel) {
                if (err) {
                    console.log(err);
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    if(!teacherModel){
                        return returnRes(res, 404, false, "Teacher Record Not Found", teacherModel);
                    }
                    return returnRes(res, 200, true, "Teacher Deleted", teacherModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
    Update: async function(req,res){
        try {
            console.log(req.params.id);
            console.log(req.body);
            await teacherSchema.validateAsync(req.body)
            teacherModel.findByIdAndUpdate({_id:req.params.id},req.body,{ new: true, runValidators: true },function (err, teacherModel) {
                if (err) {
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    if(!teacherModel){
                        return returnRes(res, 404, false, "Teacher Record Not Found", teacherModel);
                    }
                    return returnRes(res, 200, true, "Teacher Updated", teacherModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
},
}

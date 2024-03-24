var express = require("express");
var router = express.Router();
const studentDetail = require("../models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configuration");
const returnRes = require("../utilities/responseHandler");


module.exports = {
    Create: async function (req, res) {
        try {
            const body = req.body;
            studentDetail.create(body, async (err, register) => {
                if (err) {
                    return returnRes(res, 200, false, "student Not Created ", err);
                } else {
                    return returnRes(res, 200, true, "student Created Successfully", register);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something went wrong!", err);;
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

var express = require("express");
var router = express.Router();
const registerDetail = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configuration");
const returnRes = require("../utilities/responseHandler");


module.exports = {
    Create: async function (req, res) {
        try {
            const body = req.body;
            const hashedPassword = await bcrypt.hash(body.password, 15);
            body["password"] = hashedPassword;
            registerDetail.create(body, async (err, register) => {
                if (err) {
                    return returnRes(res, 200, false, "user Not Created ", err);
                } else {
                    return returnRes(res, 200, true, "User Created Successfully", register);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something went wrong!", err);;
        }
    },
};

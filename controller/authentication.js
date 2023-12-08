var express = require("express");
var router = express.Router();
const registerDetail = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configuration");
const returnRes = require("../utilities/responseHandler");


module.exports = {
    Login: async function (req, res) {
        try {
            const { email, password } = req.body;
            console.log("Req.body", req.body);
            adminUser = await registerDetail.findOne({ email: email.trim() });
            console.log("adminUser", adminUser);
            if (adminUser && Object.keys(adminUser).length == 0) {
                return returnRes(res, 200, false, "User not found");
            }
            bcrypt.compare(password, adminUser?.password, async function (err, data) {
                if (err) {
                    console.log("err", err);
                    return returnRes(
                        res,
                        200,
                        false,
                        "Incorrect username or password",
                        err
                    );
                }
                console.log("data", data);
                if (data) {
                    let prepareData = {
                        id: adminUser._id,
                        username: adminUser.username,
                        // role_id: adminUser.role_type,
                    };
                    console.log("prepareData", prepareData);
                    const token = jwt.sign(prepareData, config.secret);
                    returnRes(res, 200, true, "Login success", {
                        token: token, user: {
                            userName: adminUser?.userName,
                            role_type: adminUser?.role_type
                        }
                    });
                } else {
                    return returnRes(
                        res,
                        200,
                        false,
                        "Incorrect username or password",
                        err
                    );
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something went wrong!", error);;
        }
    },
};

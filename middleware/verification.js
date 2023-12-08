const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const userModel = require("../models/users");
const config = require("../configuration");
// const hospitalModel = require("../model/hospitalModel");
// const MobileUser = require("../model/mobileUserModel");
// const returnRes = require("../utilities/responseHandler");

module.exports = function TokenVerification(req, res, next) {
  try {
    console.log("auth middleware hit");
    const receivedToken = req.headers["authorization"];
    const bearerToken = receivedToken.split(" ")[1];
    console.log("toke", bearerToken);

    if (bearerToken == null) {
      return res.json({
        statusCode: 400,
        success: false,
        statusMessage: "Unauthorized",
      });
    }
    jwt.verify(bearerToken, config.secret, async (err, user) => {
      console.log("user", user)
      if (err) return res.json({
        statusCode: 400,
        success: false,
        statusMessage: "Unauthorized",
      });
      if (user.id) {
        // console.log("user.device_id entered if", user.device_id);
        await userModel.findOne({ _id: user.id })
          .then((result) => {
            if (result) {
              console.log("auth user id", result);
              req.headers["authorization"] = result;
              req._id = result._id;
              next();
            } else {
              return res.json({
                statusCode: 400,
                success: false,
                statusMessage: "Unauthorized",
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
            // return returnRes(res, 501, false, "User not found", err, 1);
          });
      } else {
        return res.json({
          statusCode: 400,
          success: false,
          statusMessage: "Unauthorized",
        });
        // console.log("user.device_id else part", user?.device_id);
        // if (user.role_id == 1 || user.role_id == 2) {
        //   console.log("user model", user);
        //   await userModel
        //     .findOne({ _id: ObjectId(user.id) })
        //     .then((user) => {
        //       // console.log("auth user id", user);
        //       req.headers["authorization"] = user;
        //       req.role_id = user.role_id;
        //       if (user.role_id !== 1) {
        //         req.hospital_id = user.hospital_id;
        //         req.district_id = user.district_id;
        //       }
        //       next();
        //     })
        //     .catch((err) => {
        //       // return res.status(400).json({
        //       //   success: false,
        //       //   status: "User not found",
        //       // });
        //       return returnRes(res, 501, false, "User not found", err, 1);
        //     });
        // } else {
        //   console.log("user model>>unitAdmin", user);
        //   await hospitalModel
        //     .findOne({ _id: ObjectId(user.id) })
        //     .then((user) => {
        //       console.log("auth user id", user);
        //       req.headers["authorization"] = user;
        //       req.role_id = user.role_id;
        //       if (user.role_id !== 1) {
        //         req.hospital_id = user._id;
        //         req.medix_customer_id = user.medix_customer_id;
        //       }
        //       next();
        //     })
        //     .catch((err) => {
        //       // return res.status(400).json({
        //       //   success: false,
        //       //   status: "User not found",
        //       // });
        //       return returnRes(res, 501, false, "User not found", err, 1);
        //     });
        // }
      }
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      success: false,
      statusMessage: "Unauthorized",
    });
  }
};

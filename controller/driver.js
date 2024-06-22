const driverModel = require("../models/driver");
const returnRes = require("../utilities/responseHandler");
const { driverSchema } = require('../joi/joiValidation')
const { uploadFile } = require('../utilities/uploadFile')


module.exports = {
    Create: async function (req, res) {
        try {
            const body = req.body;
            await driverSchema.validateAsync(req.body)
            if ( !req.files || !req.files.profilePic || !req.files.birthCertificate || (req.files.profilePic.length == 0) || (req.files.birthCertificate.length == 0)) {
                return returnRes(res, 422, false, "please fill the required media field");
            }
            const { profilePic, birthCertificate } = req.files
            if (profilePic[0].mimetype != 'image/jpeg' || birthCertificate[0].mimetype != `application/pdf`) {
                return returnRes(res, 422, false, "Invalid media type");
            }
            body.profilePic = await uploadFile(profilePic[0])
            body.birthCertificate = await uploadFile(birthCertificate[0])
            driverModel.create(body, async (err, register) => {
                if (err) {
                    return returnRes(res, 400, false, "Driver Not Created ", err);
                } else {
                    return returnRes(res, 200, true, "Driver Created Successfully", register);
                }
            });
        } catch (error) {
            console.log(error);
            return returnRes(res, 500, false, "Something went wrong!", error);
        }
    },
    GetAll: async function (req, res) {
        try {
            driverModel.find(function (err, driverModel) {
                if (err) {
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    return returnRes(res, 200, true, "List Generated", driverModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
    Get: async function(req,res){
        try {
            driverModel.findById({_id:req.params.id},function (err, driverModel) {
                if (err) {
                    console.log(err);
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    return returnRes(res, 200, true, "Driver Retrived", driverModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
    Delete: async function(req,res){
        try {
            driverModel.findByIdAndDelete({_id:req.params.id},function (err, driverModel) {
                if (err) {
                    console.log(err);
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    if(!driverModel){
                        return returnRes(res, 404, false, "Driver Record Not Found", driverModel);
                    }
                    return returnRes(res, 200, true, "Driver Deleted", driverModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
    },
    Update: async function(req,res){
        try {
            await driverSchema.validateAsync(req.body)
            driverModel.findByIdAndUpdate({_id:req.params.id},req.body,{ new: true, runValidators: true },function (err, driverModel) {
                if (err) {
                    console.log(err);
                    return returnRes(res, 400, false, "Something Went Wrong!");
                } else {
                    if(!driverModel){
                        return returnRes(res, 404, false, "Driver Record Not Found", driverModel);
                    }
                    return returnRes(res, 200, true, "Driver Updated", driverModel);
                }
            });
        } catch (error) {
            return returnRes(res, 500, false, "Something Went Wrong!");
        }
},
}

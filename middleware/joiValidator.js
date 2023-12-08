const Joi = require("joi");
const returnRes = require("../utilities/responseHandler");

module.exports = function JoiValidator(model, BodySchema) {
  // console.log("Dffd");
  return (req, res, next) => {
    try {
      console.log("req.body", req.body);
      let validate = Joi.object(model[BodySchema]);
      let isValid = validate.validate(req.body);
      // console.log("isValid", isValid);
      if (isValid.error) {
        return returnRes(
          res,
          200,
          false,
          isValid.error.details[0].message,
          {},
          1
        );
      } else {
        // console.log("validation succs", isValid.error);
        next();
      }
    } catch (error) {
      console.log("error", error);
      returnResponse(res, 500, false, "validation error", error, 1);
    }
  };
};

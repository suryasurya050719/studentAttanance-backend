let returnResponse = (res, statusCode, successState, message, result) => {
  // console.log("mail hitting :)");
  res.status(statusCode).json({
    success: successState,
    statusCode: statusCode,
    message: message,
    ...(result && { result: result }),
  });
};

module.exports = returnResponse;

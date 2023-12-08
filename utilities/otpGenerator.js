let otpResponse = () => {
    // console.log("mail hitting :)");
    return Math.floor(1000 + Math.random() * 9000)
};

module.exports = otpResponse;

const nodemailer = require("nodemailer");
const app_emailID = process.env.APP_EMAIL_ID;
const password = process.env.APP_EMAIL_PASSWORD;

// let forgotPasswordMailer = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: app_emailID,
//     pass: password,
//   },
// });
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: app_emailID,
    pass: password,
  },
});

let sendMail = (mailOptions) => {
  console.log("mail hitting :)");
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("error ===>", error);
    }
  });
};

module.exports = sendMail;

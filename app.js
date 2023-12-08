var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const auth = require("./router/auth_api/index");
const mobile = require("./router/mobile_api/index");
const web = require("./router/web_api/index");
// const TokenVerification = require("./middleware/verification");
const { default: mongoose } = require("mongoose");
const Config = require("./configuration");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(allowCrossDomain);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", auth);
app.use("/mobile", mobile);
app.use("/web", web);

mongoose.Promise = require("bluebird");
mongoose
  .connect(Config.mongodburl, { promiseLibrary: require("bluebird") })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// run 3000 port
app.listen(process.env.PORT || "3000", () => {
  console.log("server connected on 3000");
});

module.exports = app;

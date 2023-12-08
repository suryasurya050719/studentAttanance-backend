const express = require("express");
const router = express.Router();
const user = require("../../controller/user.Controller");


router.post("/userCreate", user.Create);

module.exports = router;

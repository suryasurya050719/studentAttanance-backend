const express = require("express");
const router = express.Router();
const auth = require("../../controller/authentication");

router.post("/login", auth.Login);

module.exports = router;

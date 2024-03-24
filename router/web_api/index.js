const express = require("express");
const router = express.Router();
const user = require("../../controller/user.Controller");
const student = require("../../controller/student");

// user
router.post("/userCreate", user.Create);

// admission

router.post("/studentCreate", student.Create);
router.get("/studentGet", student.Get);



module.exports = router;

const express = require("express");
const router = express.Router();
const user = require("../../controller/user.Controller");
const student = require("../../controller/student");
const multer = require("multer");


const upload = multer();
// user
router.post("/userCreate", user.Create);

// admission

router.post("/studentCreate", upload.fields([{ name: 'birthCertificate', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), student.Create);
router.get("/studentGet", student.Get);
// router.get("/getAllStudents", student.GetAll);



module.exports = router;

const express = require("express");
const router = express.Router();
const user = require("../../controller/user.Controller");
const student = require("../../controller/student");
const teacher = require("../../controller/teacher");
const driver = require("../../controller/driver");
const multer = require("multer");


const upload = multer();
// user
router.post("/userCreate", user.Create);

// admission

router.post("/studentCreate", upload.fields([{ name: 'birthCertificate', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), student.Create);
router.get("/getAllStudents", student.Get);
// router.get("/getAllStudents", student.GetAll);
router.post('/teacher/teacherCreate',upload.fields([{ name: 'birthCertificate', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), teacher.Create)
router.get("/teacher/getAllTeachers", teacher.GetAll);
router.get("/teacher/:id", teacher.Get);
router.delete("/teacher/:id", teacher.Delete);
router.patch("/teacher/:id",upload.fields([{ name: 'birthCertificate', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), teacher.Update);

//Driver
router.post('/driver/driverCreate',upload.fields([{ name: 'birthCertificate', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), driver.Create)
router.get("/driver/getAllDrivers", driver.GetAll);
router.get("/driver/:id", driver.Get);
router.delete("/driver/:id", driver.Delete);
router.patch("/driver/:id",upload.fields([{ name: 'birthCertificate', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), driver.Update);



module.exports = router;

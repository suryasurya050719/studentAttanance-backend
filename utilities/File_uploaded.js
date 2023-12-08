var multer = require("multer");
var path = require("path");

// let file_uploaded = async (req, res) => {
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploaded");
  },
  filename: async function (req, file, cb) {
    console.log("fileFile", file);
    req.file = file;
    await cb(null, Date.now() + path.extname(file.originalname));
  },
});
// };

module.exports = storage;

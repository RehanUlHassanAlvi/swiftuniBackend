var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkSession } = require("../../../middlewares/checkUserSession");

const multer_new = require("multer");
const upload = multer_new();

router.post(
  "/submit",
  [
    checkSession,
    upload.single("audio"), // For handling audio file uploads (e.g., for Speaking responses)
    input_validator.submitIELTSAnswerValidate,
  ],
  controller.submitAnswer
);

module.exports = router;
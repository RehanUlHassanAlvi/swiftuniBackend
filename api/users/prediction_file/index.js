var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer_new = require("multer");
const { checkAdminPermission } = require("../../../middlewares/validate");
const upload = multer_new();

router.get(
  "/",
  [input_validator.getPredictionFileValidate],
  controller.getPredictionFile
);

module.exports = router;

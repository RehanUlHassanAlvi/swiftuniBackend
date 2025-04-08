var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer_new = require("multer");
const { checkAdminPermission } = require("../../../middlewares/validate");
const upload = multer_new();

router.get(
  "/",
  [input_validator.getPredictionFileValidate, checkAdminPermission()],
  controller.getPredictionFile
);

router.post(
  "/",
  [
    upload.any(),
    input_validator.addPredictionFileValidate,
    checkAdminPermission(),
  ],
  controller.addPredictionFile
);

router.put(
  "/",
  [
    upload.any(),
    input_validator.updatePredictionFileValidate,
    checkAdminPermission(),
  ],
  controller.updatePredictionFile
);

router.delete(
  "/",
  [input_validator.deletePredictionFileValidate, checkAdminPermission()],
  controller.deletePredictionFile
);

module.exports = router;

var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer_new = require("multer");
const { checkAdminPermission } = require("../../../middlewares/validate");
const upload = multer_new();

router.get(
  "/",
  [checkAdminPermission(), input_validator.getStrategyVideoForAdminValidate],
  controller.getStrategyVideo
);

router.post(
  "/",
  [
    checkAdminPermission(),
    upload.any(),
    input_validator.addStrategyVideoValidate,
  ],
  controller.addStrategyVideo
);

router.put(
  "/",
  [
    checkAdminPermission(),
    upload.any(),
    input_validator.updateStrategyVideoValidate,
  ],
  controller.updateStrategyVideo
);

router.delete(
  "/",
  [checkAdminPermission(), input_validator.deleteStrategyVideoValidate],
  controller.deleteStrategyVideo
);

module.exports = router;

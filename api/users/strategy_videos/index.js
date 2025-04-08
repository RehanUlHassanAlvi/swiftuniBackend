var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkAdminPermission } = require("../../../middlewares/validate");

router.get(
  "/",
  [input_validator.getStrategyVideoValidate],
  controller.getStrategyVideo
);

module.exports = router;

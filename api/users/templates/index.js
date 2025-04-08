var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/template",
  // [input_validator.addStrategyVideoValidate],
  controller.getTemplate
);

router.get(
  "/grammar-template",
  // [input_validator.addStrategyVideoValidate],
  controller.getGrammerTemplate
);

module.exports = router;

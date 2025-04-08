var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/",
  [input_validator.getWhitelabelTransactionsAccountUsageValidate],
  controller.getWhitelabelTransactionsAccountUsage
);

router.get(
  "/all",
  controller.getWhitelabelTransactionsAccountUsageAll
);

module.exports = router;

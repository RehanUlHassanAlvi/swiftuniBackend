var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getWhitelabelAccounts);

router.put(
  "/assign-account",
  [input_validator.assignAccountValidate],
  controller.assignAccount
);

module.exports = router;

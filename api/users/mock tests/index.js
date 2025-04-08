var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", [input_validator.getMockTestUserValidate], controller.getTests);

router.get("/count", [input_validator.getMockTestUserAttemptedCountValidate], controller.getMockTestUserAttemptedCount);

module.exports = router;

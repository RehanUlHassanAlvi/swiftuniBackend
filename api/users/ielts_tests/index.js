var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkSession } = require("../../../middlewares/checkUserSession");

router.get(
  "/",
  [checkSession, input_validator.getIELTSTestsForUserValidate],
  controller.getTests
);

module.exports = router;
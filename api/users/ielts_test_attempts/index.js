var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkSession } = require("../../../middlewares/checkUserSession");

router.post(
  "/start",
  [checkSession, input_validator.startIELTSTestAttemptValidate],
  controller.startTestAttempt
);

router.post(
  "/complete",
  [checkSession, input_validator.completeIELTSTestAttemptValidate],
  controller.completeTestAttempt
);

router.get(
  "/:id",
  [checkSession, input_validator.getIELTSTestAttemptValidate],
  controller.getTestAttempt
);

module.exports = router;
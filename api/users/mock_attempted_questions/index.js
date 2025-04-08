var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.post(
  "/add",
  [input_validator.addMockAttemptedQuestionsValidate],
  controller.addAttemptedQuestions
);

router.post(
  "/add-timeout",
  [input_validator.addMockTimeoutAttemptedQuestionsValidate],
  controller.addTimeoutAttemptedQuestions
);

router.get("/signed-url", controller.getSignedURL);

module.exports = router;

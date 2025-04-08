var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/get",
  [input_validator.getMockTestQuestionsValidate],
  controller.getTestQuestions
);

router.get(
  "/get-pending-questions",
  [input_validator.getPendingMockTestQuestionsValidate],
  controller.getPendingTestQuestions
);

router.get(
  "/get-question-with-options",
  [input_validator.getMockTestQuestionsWithOptionsValidate],
  controller.getTestQuestionsWithOptions
);

module.exports = router;

var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/get",
  [input_validator.getTestQuestionsValidate],
  controller.getTestQuestions
);

router.get(
  "/get-by-name",
  [input_validator.getTestQuestionsByNameValidate],
  controller.getTestQuestionsByName
);

router.get(
  "/dashboard-search",
  [input_validator.dashboardSearchValidate],
  controller.dashboardSearch
);

router.get(
  "/get-question-with-options",
  [input_validator.getTestQuestionsWithOptionsValidate],
  controller.getTestQuestionsWithOptions
);

router.delete(
  "/reset-attempted-test-questions",
  [input_validator.resetAttemptedTestQuestionsValidate],
  controller.resetAttemptedTestQuestions
);

module.exports = router;

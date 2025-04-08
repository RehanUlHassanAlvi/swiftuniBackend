var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/get",
  [input_validator.getTestQuestionsValidate],
  controller.getTestQuestions
);

router.post(
  "/add-update",
  [input_validator.addAndUpdateTestQuestionsValidate],
  controller.addAndUpdateTestQuestions
);

router.get(
  "/delete",
  [input_validator.deleteTestQuestionsValidate],
  controller.deleteTestQuestions
);

router.post(
  "/update-orderid",
  [input_validator.updateOrderIdTestQuestionsValidate],
  controller.updateOrderIdTestQuestions
);

router.get(
  "/get-by-name",
  [input_validator.getTestQuestionsByNameAdminValidate],
  controller.getTestQuestionsByName
);

router.get(
  "/get-question-with-options",
  [input_validator.getTestQuestionsWithOptionsValidate],
  controller.getTestQuestionsWithOptions
);

module.exports = router;

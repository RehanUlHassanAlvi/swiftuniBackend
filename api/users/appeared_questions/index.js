var express = require("express");
var router = express.Router();
var controller = require("./controller");
var input_validator = require("../../../middlewares/validation");

router.get(
  "/",
  [input_validator.getAppearedQuestionsOfUserValidate],
  controller.getAppearedQuestionsOfUser
);

router.post(
  "/",
  [input_validator.addAppearedQuestionsValidate],
  controller.addAppearedQuestions
);

router.delete(
  "/",
  [input_validator.deleteAppearedQuestionsValidate],
  controller.deleteAppearedQuestions
);

module.exports = router;

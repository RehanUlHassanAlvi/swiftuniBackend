var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkSession } = require("../../../middlewares/checkUserSession");
const commentsRouter = require("./comments/index");

router.get(
  "/get-attempted-question-by-questionid",
  [input_validator.getAttemptedQuestionsByQuestionIdValidate],
  controller.getAttemptedQuestionsByQuestionId
);

router.get(
  "/get-attempted-question-of-users-by-questionid",
  [input_validator.getAttemptedQuestionsByQuestionIdValidate],
  controller.getAttemptedQuestionsOfOthersByQuestionId
);

router.post(
  "/add",
  [input_validator.addAttemptedQuestionsValidate],
  controller.addAttemptedQuestions
);

router.delete(
  "/delete-attempted-question-of-user-by-attempted-questionid",
  [input_validator.deleteAttemptedQuestionsValidate],
  controller.deleteAttemptedQuestions
);

router.get(
  "/like",
  [input_validator.AttemptedQuestionLikeDislikeValidate],
  controller.addCommentLike
);

router.delete(
  "/like",
  [input_validator.AttemptedQuestionLikeDislikeValidate],
  controller.deleteCommentLike
);

// Comments

router.use("/comments", [checkSession], commentsRouter);

module.exports = router;

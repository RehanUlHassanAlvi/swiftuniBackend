var express = require("express");
var router = express.Router();
var input_validator = require("../../../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/",
  [input_validator.addAttemptedQuestionCommentLikeValidate],
  controller.addCommentLike
);

router.delete(
  "/",
  [input_validator.commentLikeValidate],
  controller.deleteCommentLike
);

module.exports = router;

var express = require("express");
var router = express.Router();
var input_validator = require("../../../../middlewares/validation");
var controller = require("./controller");
const commentsLikesRouter = require("./comment Likes/index");

const multer = require("multer");
const upload = multer();

router.post(
  "/add",
  [upload.any(), input_validator.addAttemptedQuestionCommentValidate],
  controller.addComment
);

router.get(
  "/delete",
  [input_validator.deleteCommentValidate],
  controller.deleteComment
);

router.use("/likes", commentsLikesRouter);

module.exports = router;

var express = require("express");
var router = express.Router();
var controller = require("./controller");
var input_validator = require("../../../../middlewares/validation");

router.get(
  "/",
  [input_validator.getTestQuestionNoteOfUserValidate],
  controller.getTestQuestionNoteOfUser
);

router.post(
  "/",
  [input_validator.addOrEditTestQuestionNotesValidate],
  controller.addOrEditTestQuestionNotes
);

router.delete(
  "/",
  [input_validator.deleteTestQuestionNoteOfUserValidate],
  controller.deleteTestQuestionNoteOfUser
);

module.exports = router;

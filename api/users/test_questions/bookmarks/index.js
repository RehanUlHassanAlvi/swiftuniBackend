var express = require("express");
var router = express.Router();
var controller = require("./controller");
var input_validator = require("../../../../middlewares/validation");

router.get(
  "/",
  [input_validator.addBookmarkValidate],
  controller.addBookmark
);

router.delete(
  "/",
  [input_validator.deleteBookmarkValidate],
  controller.deleteBookmark
);

module.exports = router;

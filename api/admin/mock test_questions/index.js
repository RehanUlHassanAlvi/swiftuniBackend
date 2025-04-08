var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const {
  checkAdminPortalPermission,
  checkAdminPermission,
} = require("../../../middlewares/validate");

router.get(
  "/get",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.getMockTestQuestionsValidate,
  ],
  controller.getTestQuestions
);

router.post(
  "/add-update",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addAndUpdateMockTestQuestionsValidate,
  ],
  controller.addAndUpdateTestQuestions
);

router.get(
  "/delete",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteMockTestQuestionsValidate,
  ],
  controller.deleteTestQuestions
);

module.exports = router;

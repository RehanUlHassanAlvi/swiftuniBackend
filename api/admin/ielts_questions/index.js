var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const {
  checkAdminPortalPermission,
  checkAdminPermission,
} = require("../../../middlewares/validate");
const { checkSession } = require("../../../middlewares/checkAdminSession");

router.get(
  "/",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.getIELTSQuestionsValidate,
  ],
  controller.getQuestions
);

router.post(
  "/add",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addIELTSQuestionValidate,
  ],
  controller.addQuestions
);

router.post(
  "/update",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateIELTSQuestionValidate,
  ],
  controller.updateQuestions
);

router.post(
  "/delete",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteIELTSQuestionValidate,
  ],
  controller.deleteQuestions
);

module.exports = router;
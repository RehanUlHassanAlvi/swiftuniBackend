var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer = require("multer");
const upload = multer();
router.get("/", controller.getQuestion);
const {
  checkAdminPortalPermission,
  checkAdminPermission,
} = require("../../../middlewares/validate");

router.post(
  "/add",
  [
    // upload.any(),
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addQuestionValidate,
  ],
  controller.addQuestion
);

router.post(
  "/update-prediction",
  checkAdminPortalPermission(),
  checkAdminPermission(),
  [input_validator.updateQuestionPredictionValidate],
  controller.updateQuestionPredition
);

router.post(
  "/update",
  [
    // upload.any(),
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateQuestionValidate,
  ],
  controller.updateQuestion
);

router.get(
  "/delete",
  checkAdminPortalPermission(),
  checkAdminPermission(),
  [input_validator.deleteQuestionValidate],
  controller.deleteQuestion
);

router.get("/signed-url", controller.getSignedURL);

module.exports = router;

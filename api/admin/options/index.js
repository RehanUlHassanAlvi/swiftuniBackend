var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const {
  checkAdminPortalPermission,
  checkAdminPermission,
} = require("../../../middlewares/validate");

router.get(
  "/",
  checkAdminPortalPermission(),
  checkAdminPermission(),
  controller.getOption
);

router.post(
  "/add",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addOptionValidate,
  ],
  controller.addOption
);

router.post(
  "/update",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateOptionValidate,
  ],
  controller.updateOption
);

router.get(
  "/delete",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteOptionValidate,
  ],
  controller.deleteOption
);

module.exports = router;

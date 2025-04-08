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
    input_validator.getIELTSOptionsValidate,
  ],
  controller.getOptions
);

router.post(
  "/add",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addIELTSOptionValidate,
  ],
  controller.addOptions
);

router.post(
  "/update",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateIELTSOptionValidate,
  ],
  controller.updateOptions
);

router.post(
  "/delete",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteIELTSOptionValidate,
  ],
  controller.deleteOptions
);

module.exports = router;
var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { createTest } = require("./controller");
const {
  checkAdminPortalPermission,
  checkAdminPermission,
} = require("../../../middlewares/validate");
const { checkSession } = require("../../../middlewares/checkAdminSession");
const { checkUserSession } = require("../../../middlewares/checkUserSession");


router.get(
  "/",checkUserSession,
  controller.getTests
);

router.post(
  "/add",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addIELTSTestValidate,
  ],
  controller.addTests
);

router.post(
  "/update",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateIELTSTestValidate,
  ],
  controller.updateTests
);

router.post(
  "/delete",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteIELTSTestValidate,
  ],
  controller.deleteTests
);



router.post("/create", checkSession,  createTest);

module.exports = router;
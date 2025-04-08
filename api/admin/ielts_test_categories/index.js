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
    input_validator.getIELTSTestCategoriesValidate,
  ],
  controller.getTestCategories
);

router.post(
  "/add",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addIELTSTestCategoryValidate,
  ],
  controller.addTestCategories
);

router.post(
  "/update",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateIELTSTestCategoryValidate,
  ],
  controller.updateTestCategories
);

router.post(
  "/delete",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteIELTSTestCategoryValidate,
  ],
  controller.deleteTestCategories
);

module.exports = router;
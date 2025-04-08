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
    input_validator.getAdminMockTestsValidate,
  ],
  controller.getTests
);

router.post(
  "/add",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addMockTestsValidate,
  ],
  controller.addTests
);

router.post(
  "/update",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateMockTestsValidate,
  ],
  controller.updateTests
);

router.get(
  "/delete",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteMockTestsValidate,
  ],
  controller.deleteTests
);

router.post(
  "/update-orderid",
  [
    checkSession,
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateOrderIdTestsValidate,
  ],
  controller.updateOrderIdTests
);

router.get(
  "/last-attempted-mockt-test-of-users-organization",
  [checkSession, input_validator.lastAttemptedMockTestOfUsersOrganizationValidate],
  controller.lastAttemptedMockTestOfUsersOrganization
);

router.get(
  "/get-score",
  [input_validator.getMockTestAnalyticsForAdminValidate],
  controller.getMockTestScore
);

module.exports = router;

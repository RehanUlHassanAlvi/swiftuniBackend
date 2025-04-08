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
  controller.getSubscription
);

router.get(
  "/subscription-plans",
  [input_validator.getSubscriptionPlansValidate],
  controller.getSubscriptionPlans
);

router.get(
  "/subscription-plans-mock",
  [input_validator.getSubscriptionPlansValidate],
  controller.getSubscriptionPlansMock
);

router.post(
  "/",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.addSubscriptionValidate,
  ],
  controller.addSubscription
);

router.put(
  "/",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.updateSubscriptionValidate,
  ],
  controller.updateSubscription
);

router.delete(
  "/",
  [
    checkAdminPortalPermission(),
    checkAdminPermission(),
    input_validator.deleteSubscriptionValidate,
  ],
  controller.deleteSubscription
);

module.exports = router;

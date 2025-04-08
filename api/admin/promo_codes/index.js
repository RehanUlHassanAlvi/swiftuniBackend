var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkAdminPermission } = require("../../../middlewares/validate");

router.get("/", [checkAdminPermission()], controller.getAllPromoCode);

router.get(
  "/get-by-id",
  [input_validator.getPromoCodeByIdValidate],
  controller.getPromoCodeById
);

router.get(
  "/get-promocode",
  [input_validator.getPromoCodeByIdValidate],
  controller.getPromoCodeForWhitelabelById
);

router.post(
  "/",
  [input_validator.addPromoCodeValidate, checkAdminPermission()],
  controller.addPromoCode
);

router.put(
  "/",
  [input_validator.updatePromoCodeStatusValidate, checkAdminPermission()],
  controller.updatePromoCodeStatus
);

router.get(
  "/promocode-usage",
  [input_validator.getPromoCodeUsageValidate],
  controller.getPromoCodeUsage
);

router.put(
  "/reactivate",
  [input_validator.reactivatePromoCodeValidate, checkAdminPermission()],
  controller.reactivatePromoCode
);

module.exports = router;

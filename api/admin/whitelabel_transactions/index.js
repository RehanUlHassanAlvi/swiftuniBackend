var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer = require("multer");
const upload = multer();

router.post(
  "/bank-details",
  [upload.any(), input_validator.subscribePackageUsingBankWhitelabelValidate],
  controller.subscribePackageUsingBankWhitelabel
);

router.post(
  "/payment-success",
  [input_validator.paymentSucessWhitelabelValidate],
  controller.paymentSuccessWhitelabel
);

router.post(
  "/superadmin-buy",
  [input_validator.superadminBuyValidate],
  controller.superadminBuy
);

module.exports = router;

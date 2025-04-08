var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer = require("multer");
const upload = multer();
router.post(
  "/credit-card",
  [input_validator.subscribePackageUsingCreaditCardValidate],
  controller.subscribePackageUsingCreaditCard
);

router.post(
  "/bank-details",
  [upload.any(), input_validator.subscribePackageUsingBankValidate],
  controller.subscribePackageUsingBank
);

router.post(
  "/payment-success",
  [input_validator.paymentSucessValidate],
  controller.paymentSuccess
);

router.post(
  "/free-subscription",
  [input_validator.freeSubscriptionSuccessValidate],
  controller.freeSubscriptionSuccess
);

router.get(
  "/",
  [input_validator.userTransactionsForUserValidate],
  controller.userTransactionsForUser
);

module.exports = router;

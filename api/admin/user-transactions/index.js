var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.put(
  "/approve",
  [input_validator.approveUserTransactionValidate],
  controller.approveUserTransaction
);

router.get(
  "/",
  [input_validator.userTransactionsValidate],
  controller.userTransactions
);

router.get(
  "/all",
  [input_validator.allTransactionsValidate],
  controller.allTransactions
);

router.post(
  "/superadmin-buy-subscription",
  [input_validator.superadminBuySubscriptionValidate],
  controller.superadminBuySubscription
);

module.exports = router;

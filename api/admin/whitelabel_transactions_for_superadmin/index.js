var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.put(
  "/approve",
  [input_validator.approveAdminTransactionValidate],
  controller.approveAdminTransaction
);

router.get(
  "/",
  [input_validator.adminTransactionsValidate],
  controller.adminTransactions
);

router.get(
  "/portal",
  [input_validator.portalTransactionsValidate],
  controller.portalTransactions
);

router.get(
  "/all",
  [input_validator.allAdminTransactionsValidate],
  controller.allAdminTransactions
);

module.exports = router;

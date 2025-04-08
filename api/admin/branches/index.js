var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getBranches);

router.get(
  "/get-branch-by-branchid",
  [input_validator.getBranchByBranchIdValidate],
  controller.getBranchByBranchId
);

router.get(
  "/get-branch-by-portalid",
  [input_validator.getBranchByPortalIdValidate],
  controller.getBranchByPortalId
);

router.get(
  "/get-branch-accounts",
  [input_validator.getBranchAccountsValidate],
  controller.getBranchAccounts
);

router.post(
  "/add",
  [input_validator.addBranchesValidate],
  controller.addBranches
);

router.delete(
  "/delete",
  [input_validator.deleteBranchesValidate],
  controller.deleteBranches
);

router.put(
  "/assign-accounts",
  [input_validator.assignAccountsToBranchesValidate],
  controller.assignAccountsToBranches
);

router.get(
  "/get-branch-transactions",
  controller.getBranchTransactions
);

module.exports = router;

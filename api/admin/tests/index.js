var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getTests);

router.get("/categories", controller.getCategorizedTests);

router.post(
  "/add",
  [input_validator.addTestsValidate],
  controller.addTests
);

router.post(
  "/update",
  [input_validator.updateTestsValidate],
  controller.updateTests
);

router.get(
  "/delete",
  [input_validator.deleteTestsValidate],
  controller.deleteTests
);

router.post(
  "/update-orderid",
  [input_validator.updateOrderIdTestsValidate],
  controller.updateOrderIdTests
);

module.exports = router;

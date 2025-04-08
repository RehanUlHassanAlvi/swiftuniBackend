var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getTestCategories);

router.post(
  "/add",
  [input_validator.addTestCategoriesValidate],
  controller.addTestCategories
);

router.post(
  "/update",
  [input_validator.updateTestCategoriesValidate],
  controller.updateTestCategories
);

router.get(
  "/delete",
  [input_validator.deleteTestCategoriesValidate],
  controller.deleteTestCategories
);

router.post(
  "/update-orderid",
  [input_validator.updateOrderIdTestCategoriesValidate],
  controller.updateOrderIdTestCategories
);

module.exports = router;

var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get(
  "/get-promocode",
  [input_validator.getPromoCodeByIdValidate],
  controller.getPromoCodeForUserById
);

router.get(
  "/check-promocode",
  [input_validator.getPromoCodeByIdValidate],
  controller.checkPromoCodeForUserById
);

module.exports = router;

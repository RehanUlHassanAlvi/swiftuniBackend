var express = require("express");
var router = express.Router();
var input_validator = require("../../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getCountries);

router.post(
  "/",
  [input_validator.addCountryValidate],
  controller.addCountry
);

router.put(
  "/",
  [input_validator.updateCountryValidate],
  controller.updateCountry
);

router.put(
  "/approve",
  [input_validator.approveCountryValidate],
  controller.approveCountry
);

router.get("/plans_of_country",
  [input_validator.approveCountryValidate],
  controller.getPlanOfCountry
);

router.put("/plan_price_of_country",
  [input_validator.updatePlanPriceOfCountryValidate],
  controller.updatePlanPriceOfCountry
);


module.exports = router;

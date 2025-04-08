var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/get", controller.getAttemptedMockTests);

router.put(
  "/update",
  [input_validator.updateMockTestAttemptValidate],
  controller.updateMockTestAttempt
);

router.delete(
  "/delete",
  [input_validator.getMockTestAnalyticsValidate],
  controller.deleteMockTestAttempt
);

router.get(
  "/get-analytics",
  [input_validator.getMockTestAnalyticsValidate],
  controller.getMockTestAnalytics
);

router.get(
  "/get-score",
  [input_validator.getMockTestAnalyticsValidate],
  controller.getMockTestScore
);


// Development API
router.delete(
  "/delete-attempted-tests",
  controller.deleteMockAttempted
);

module.exports = router;

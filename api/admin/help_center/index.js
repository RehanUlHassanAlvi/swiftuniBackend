var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getHelpCenters);

router.post(
  "/",
  [input_validator.addHelpCenterValidate],
  controller.addHelpCenter
);

router.put(
  "/",
  [input_validator.updateHelpCenterValidate],
  controller.updateHelpCenter
);

router.delete(
  "/",
  [input_validator.deleteHelpCenterValidate],
  controller.deleteHelpCenter
);

module.exports = router;

var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/portal-info",[input_validator.getPortalInfoForUsersValidate], controller.getPortalInfo);

module.exports = router;

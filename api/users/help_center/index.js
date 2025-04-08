var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getHelpCenters);

module.exports = router;

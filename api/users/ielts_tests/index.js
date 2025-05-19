var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkSession } = require("../../../middlewares/checkUserSession");

router.get(
  "/",
  checkSession,
  controller.getTests
);
router.post(
  "/saveTestAttempt",
   checkSession,
  controller.saveTestAttempt
);


module.exports = router;
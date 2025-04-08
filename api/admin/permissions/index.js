var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkAdminPermission } = require("../../../middlewares/validate");

router.get("/",
  // checkAdminPermission(),
  controller.getAllPermissions);

router.post(
  "/",
  // checkAdminPermission(),
  controller.addNewPermissionsAgainstUser
);

module.exports = router;

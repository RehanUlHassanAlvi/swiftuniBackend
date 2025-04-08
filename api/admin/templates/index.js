var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer_new = require("multer");
const { checkAdminPermission } = require("../../../middlewares/validate");
const upload = multer_new();

router.get("/template", [checkAdminPermission()], controller.getTemplate);

router.get(
  "/grammar-template",
  [checkAdminPermission()],
  controller.getGrammerTemplate
);

router.post(
  "/add",
  [upload.any(), checkAdminPermission(), input_validator.addTemplateValidate],
  controller.addTemplate
);

router.post(
  "/update",
  [
    upload.any(),
    checkAdminPermission(),
    input_validator.updateTemplateValidate,
  ],  
  controller.updateTemplate
);

router.get(
  "/delete",
  [input_validator.deleteTemplateValidate, checkAdminPermission()],
  controller.deleteTemplate
);

module.exports = router;

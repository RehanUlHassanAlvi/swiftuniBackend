var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const multer = require("multer");
const { checkAdminPermission } = require("../../../middlewares/validate");

const multerPortal = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 50, // 2mb file size
  },
}).fields([
  { name: "portal_logo", maxCount: 1 },
  { name: "favicon", maxCount: 1 },
  { name: "landing_img", maxCount: 1 },
  { name: "youtube_thumbnail", maxCount: 1 }
]);

router.get("/", [checkAdminPermission()], controller.getPortal);

router.get(
  "/portal-admins",
  [input_validator.getPortalAdminsValidate],
  controller.getPortalAdmins
);

router.post(
  "/add",
  [input_validator.addPortalValidate, checkAdminPermission()],
  controller.addPortal
);

router.post(
  "/update",
  [input_validator.updatePortalValidate, checkAdminPermission()],
  controller.updatePortal
);

router.put(
  "/update-info",
  multerPortal,
  input_validator.updatePortalInfoValidate,
  controller.updatePortalInfo,
  checkAdminPermission()
);

router.get(
  "/delete",
  [input_validator.deletePortalValidate, checkAdminPermission()],
  controller.deletePortal
);

router.get(
  "/portal-configuration",
  controller.getPortalConfiguration
);

router.put(
  "/portal-configuration",
  [input_validator.updatePortalConfigurationValidate],
  controller.updatePortalConfiguration
);

router.get(
  "/portal-metrics",
  controller.getPortalMetrics
);

module.exports = router;

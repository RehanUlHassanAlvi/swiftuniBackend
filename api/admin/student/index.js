var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");
const { checkSession } = require("../../../middlewares/checkAdminSession");
const { checkBlockedUsersArray } = require("../../utils/utils");

const multer_new = require("multer");
const upload = multer_new();

router.get(
  "/all",
  [checkSession, input_validator.getStudentValidate],
  controller.getAllStudent
);

router.get(
  "/student-data",
  [checkSession, input_validator.getStudentDataValidate],
  controller.getStudentData
);

router.get(
  "/",
  [checkSession, input_validator.getStudentValidate],
  controller.getStudent
);

router.get(
  "/from-trash",
  [checkSession, input_validator.getStudentValidate],
  controller.getStudentFromTrash
);

router.post(
  "/",
  [checkSession, upload.any(), input_validator.addStudentValidate],
  controller.addStudent
);

router.delete(
  "/",
  [checkSession, input_validator.deleteStudentValidate],
  controller.deleteStudent
);

router.delete(
  "/from-trash",
  [checkSession, input_validator.deleteStudentValidate],
  controller.deleteStudentFromTrash
);

router.put(
  "/",
  [checkSession, upload.any(), input_validator.updateStudentValidate],
  controller.updateStudent
);

router.put(
  "/logout-user",
  [checkSession, input_validator.logoutUserByAdminValidate],
  controller.logoutUserByAdmin
);

router.put(
  "/update-student-branch",
  [checkSession, input_validator.updateStudentBranchValidate],
  controller.updateStudentBranch
);

router.get(
  "/get-mock-test-attempts-of-user",
  [checkSession, input_validator.getMockTestAttemptsofUserValidate],
  controller.getAttemptedMockTests
);

module.exports = router;

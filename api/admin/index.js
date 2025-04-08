var express = require("express");
var router = express.Router();
var input_validator = require("../../middlewares/validation");
var controller = require("./controller");

const { checkSession } = require("../../middlewares/checkAdminSession");
const testCategoriesRouter = require("./test_categories/index");
const mocktestsRouter = require("./mock tests/index");
const mocktestQuestionsRouter = require("./mock test_questions/index");
const testsRouter = require("./tests/index");
const testQuestionsRouter = require("./test_questions/index");
const questionsRouter = require("./question/index");
const optionsRouter = require("./options/index");
const templatessRouter = require("./templates/index");
const portalsRouter = require("./portal/index");
const permissionsRouter = require("./permissions/index");
const predictionFilesRouter = require("./prediction_file/index");
const strategyVideosRouter = require("./strategy_videos/index");
const studentsRouter = require("./student/index");
const subscriptionsRouter = require("./subscriptions/index");
const promoCodesRouter = require("./promo_codes/index");
const { checkAdminPermission } = require("../../middlewares/validate");
const userTransactionsRouter = require("./user-transactions/index");
const whiteLabelTransactionsRouter = require("./whitelabel_transactions/index");
const whitelabelTransactionsForSuperadminRouter = require("./whitelabel_transactions_for_superadmin/index");
const whitelabelAccountsManagementRouter = require("./whitelabel_accounts_management/index");
const branchesRouter = require("./branches/index");
const helpCenterRouter = require("./help_center/index");
const countriesRouter = require("./plans/countries/index");
const whitelabelTransactionsAccountUsageRouter = require("./whitelabel_transactions_account_usage/index");

//IELTS related APIs
// Add IELTS admin routers
const ieltsTestCategoriesRouter = require("./ielts_test_categories/index");
const ieltsTestsRouter = require("./ielts_tests/index");
const ieltsTestPartsRouter = require("./ielts_test_parts/index");
const ieltsQuestionsRouter = require("./ielts_questions/index");
const ieltsOptionsRouter = require("./ielts_options/index"); 

router.get("/", [checkSession], controller.getAdmin);

router.get("/get-transaction-details", controller.getTransactionDetails);

router.post(
  "/login-admin",
  [input_validator.loginAdminValidate],
  controller.loginAdmin
);

router.post(
  "/add-admin",
  [checkSession, input_validator.addAdminValidate],
  controller.addAdmin
);

router.post(
  "/add-admin-in-other",
  [checkSession, input_validator.addAdminInOtherValidate],
  controller.addAdminInOther
);

router.get(
  "/delete-admin",
  [checkSession, input_validator.adminDeleteValidate],
  controller.adminDelete
);

router.post(
  "/update-admin",
  [checkSession, input_validator.updateAdminValidate],
  controller.updateAdmin
);

router.post(
  "/update-transaction-details",
  [checkSession, input_validator.updateTransactionDetailsValidate],
  controller.updateTransactionDetails
);

router.get("/logout", controller.sessionDestroy);

router.put(
  "/update-admin-branch",
  [checkSession, input_validator.updateAdminBranchValidate],
  controller.updateAdminBranch
);

router.get("/get-examdate-of-user", [input_validator.getExamDateOfUserValidate], controller.getExamDateOfUser);

// Test Categories Operations

router.use("/options", [checkSession], optionsRouter);

router.use("/questions", [checkSession], questionsRouter);

router.use("/test-categories", [checkSession], testCategoriesRouter);

router.use("/mock-test-questions", [checkSession], mocktestQuestionsRouter);

router.use("/mock-tests", mocktestsRouter);

router.use("/test-questions", [checkSession], testQuestionsRouter);

router.use("/tests", [checkSession], testsRouter);

router.use("/templates", [checkSession], templatessRouter);

router.use("/portals", [checkSession], portalsRouter);

router.use("/student", [checkSession], studentsRouter);

router.use("/subscriptions", [checkSession], subscriptionsRouter);




router.get(
  "/average-score-of-user",
  [checkSession, input_validator.averageScoreValidate],
  controller.averageScore
);


router.use(
  "/permissions",
  // [checkSession],
  permissionsRouter
);

router.use("/prediction-files", [checkSession], predictionFilesRouter);

router.use("/strategy-videos", [checkSession], strategyVideosRouter);

router.use("/promo-codes", [checkSession], promoCodesRouter);

router.get(
  "/portal-info",
  [input_validator.getPortalInfoValidate, checkAdminPermission()],
  controller.getPortalInfo
);

router.get(
  "/portal-info-by-id",
  [checkSession, input_validator.getPortalInfoByIdValidate],
  controller.getPortalInfoById
);

router.use("/user-transactions", [checkSession], userTransactionsRouter);

router.use(
  "/whitelabel-transactions",
  [checkSession],
  whiteLabelTransactionsRouter
);

router.use(
  "/whitelabel-transactions-superadmin",
  [checkSession],
  whitelabelTransactionsForSuperadminRouter
);

router.use(
  "/whitelabel-accounts-management",
  [checkSession],
  whitelabelAccountsManagementRouter
);

router.use("/branches", [checkSession], branchesRouter);

router.use("/help-center", [checkSession], helpCenterRouter);

router.use("/countries", [checkSession], countriesRouter);

router.use(
  "/whitelabel-transactions-account-usage",
  [checkSession],
  whitelabelTransactionsAccountUsageRouter
);



// Add IELTS admin routers
router.use("/ielts-test-categories", [checkSession], ieltsTestCategoriesRouter);
router.use("/ielts-tests", [checkSession], ieltsTestsRouter);
router.use("/ielts-test-parts", [checkSession], ieltsTestPartsRouter);
router.use("/ielts-questions", [checkSession], ieltsQuestionsRouter);
router.use("/ielts-options", [checkSession], ieltsOptionsRouter);

module.exports = router;

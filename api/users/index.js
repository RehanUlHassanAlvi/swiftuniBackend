var express = require("express");
var router = express.Router();
var input_validator = require("../../middlewares/validation");
var controller = require("./controller");
// const { multer } = require("../../utils/utils");
const { checkSession } = require("../../middlewares/checkUserSession");
const { checkBlockedUsersArray } = require("../utils/utils");
const testCategoriesWithTestsRouter = require("./test_categories_with_tests/index");
const testQuestionsRouter = require("./test_questions/index");
const attemptedQuestionsRouter = require("./attempted_questions/index");
const bookmarksRouter = require("./test_questions/bookmarks/index");
const testQuestionNotesRouter = require("./test_questions/test_question_notes/index");
const appearedQuestionsRouter = require("./appeared_questions/index");
const mocktestsRouter = require("./mock tests/index");
const mocktestQuestionsRouter = require("./mock test_questions/index");
const mockAttemptedQuestionsRouter = require("./mock_attempted_questions/index");
const mockTestAttemptRouter = require("./mock test_attempts/index");
const templatesRouter = require("./templates/index");
const vocabsRouter = require("./vocab_bank/index");
const commentsRouter = require("./comments/index");
const predictionFilesRouter = require("./prediction_file/index");
const strategyVideosRouter = require("./strategy_videos/index");
const portalsRouter = require("./portal/index");
const subscriptionsRouter = require("./subscriptions/index");
const userTransactionsRouter = require("./user-transactions/index");
const promoCodesRouter = require("./promo_codes/index");
const helpCenterRouter = require("./help_center/index");
const countriesRouter = require("./plans/countries/index");

const multer_new = require("multer");
const upload = multer_new();

router.post(
  "/login-user",
  [input_validator.loginUserValidate],
  controller.loginUser
);

router.post(
  "/signup-user",
  [input_validator.addUserValidate],
  controller.addUser
);

router.post(
  "/delete-user",
  [
    checkSession,
    checkBlockedUsersArray,
    input_validator.UserDeletebyUserValidate,
  ],
  controller.userDelete
);

router.delete(
  "/delete-user-permanently",
  [
    checkSession,
    checkBlockedUsersArray,
    // input_validator.permanentlyDeleteUserValidate,
  ],
  controller.permanentlyDeleteUser
);

router.post(
  "/update-user",
  [
    checkSession,
    // checkBlockedUsersArray,
    upload.any(),
    input_validator.updateUserValidate,
  ],
  controller.updateUser
);

router.post(
  "/login-with-auth",
  [input_validator.loginWithAuthValidate],
  controller.userLoginWithAuth
);

router.post(
  "/signup-with-auth",
  [input_validator.signUpWithAuthValidate],
  controller.userSignUpWithAuth
);

router.post(
  "/resend-email-verification",
  [input_validator.resendEmailVerificationValidate],
  controller.resendEmailVerification
);

router.post(
  "/verify-email",
  [input_validator.verifyEmailValidate],
  controller.verifyEmail
);

router.post(
  "/send-password-reset-mail",
  [input_validator.passwordResetValidate],
  controller.passwordReset
);

router.post(
  "/verify-password-token",
  [input_validator.verifyPasswordtokenValidate],
  controller.verifyPasswordtoken
);

router.get(
  "/user-analysis",
  [checkSession, input_validator.userAnalysisValidate],
  controller.userAnalysis
);

router.get(
  "/stored-analysis",
  [checkSession, input_validator.userAnalysisValidate],
  controller.userStoredAnalysis
);

router.get(
  "/average-score",
  [checkSession],
  controller.averageScore
);

router.post(
  "/update-examdate",
  [checkSession, input_validator.updateExamDateValidate],
  controller.updateExamDate
);

router.get("/get-examdate", [checkSession], controller.getExamDate);

router.get("/logout", controller.sessionDestroy);

router.get("/dummy-api-check-session", [checkSession], controller.checkSession);

router.get("/check-tokens", [checkSession], controller.checkTokens);

router.post("/subtract-tokens", [checkSession , input_validator.subtractTokensValidate], controller.subtractTokens);

// Test Categories Operations

router.use("/test-categories", [checkSession], testCategoriesWithTestsRouter);

router.use("/test-questions", [checkSession], testQuestionsRouter);

router.use("/attempted-questions", [checkSession], attemptedQuestionsRouter);

router.use("/bookmarks", [checkSession], bookmarksRouter);

router.use("/test-question-notes", [checkSession], testQuestionNotesRouter);

router.use("/appeared-questions", [checkSession], appearedQuestionsRouter);

// Mock Test Categories Operations

router.use("/mock-test-questions", [checkSession], mocktestQuestionsRouter);

router.use("/mock-tests", [checkSession], mocktestsRouter);

router.use(
  "/mock-attempted-questions",
  [checkSession],
  mockAttemptedQuestionsRouter
);

// Templates Operations

router.use("/templates", [checkSession], templatesRouter);

// Vocab Operations

router.use("/vocab", [checkSession], vocabsRouter);

//Mock Test Attempts

router.use("/mock-test-attempts", [checkSession], mockTestAttemptRouter);

// Comments

router.use("/comments", [checkSession], commentsRouter);

router.use("/portals", portalsRouter);

router.use("/prediction-files", [checkSession], predictionFilesRouter);

router.use("/strategy-videos", [checkSession], strategyVideosRouter);

router.use("/subscriptions", [checkSession], subscriptionsRouter);

router.use("/user-transactions", [checkSession], userTransactionsRouter);

router.use("/promo-codes", [checkSession], promoCodesRouter);

router.post("/user-google-response",[input_validator.userGoogleResponseValidate], controller.userGoogleResponse);

router.use("/help-center", [checkSession], helpCenterRouter);

router.use("/countries", [checkSession], countriesRouter);

module.exports = router;


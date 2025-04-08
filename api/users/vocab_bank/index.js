var express = require("express");
var router = express.Router();
var input_validator = require("../../../middlewares/validation");
var controller = require("./controller");

router.get("/", controller.getVocabBank);

router.post(
  "/add",
  [input_validator.addVocabBankValidate],
  controller.addVocabBank
);

router.post(
  "/update",
  [input_validator.updateVocabBankValidate],
  controller.updateVocabBank
);

router.get(
  "/delete",
  [input_validator.deleteVocabBankValidate],
  controller.deleteVocabBank
);

module.exports = router;

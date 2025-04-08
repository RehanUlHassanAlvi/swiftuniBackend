var express = require("express");
var router = express.Router();
const apisRouter = require("../api/index");
const controller = require("./controller");
router.use("/app/", apisRouter);
router.get("/", controller.checkBackend);

module.exports = router;

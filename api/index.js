var express = require("express");
var router = express.Router();
const adminRouter = require("./admin/index");
const usersRouter = require("./users/index");
// const { alfalahWebHookListener } = require("./webhooks/alfalah");

router.use("/admin/", adminRouter);
router.use("/users/", usersRouter);
// router.get("/listener/", alfalahWebHookListener);

module.exports = router;

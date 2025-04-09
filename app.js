var express = require("express");
var path = require("path");
var cors = require("./middlewares/cors");
const session = require("express-session");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const FileStore = require("session-file-store")(session);
var indexRouter = require("./routes/index");
// var cors = require("cors");
var app = express();
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// view engine setup
app.use(cors);
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(helmet());
app.disable("x-powered-by");
app.set("trust proxy", true);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const fileStoreOptions = {
  reapInterval: 3600,
  reapAsync: true,
  reapSyncFallback: true,
  logFn: () => {},
};

app.use(
  session({
    secret: "SwiftUniSecret",
    store: new FileStore(fileStoreOptions),
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      // path: "/",
      sameSite: "none",
      // httpOnly: true, //if true prevents client-side js from reading cookie
      secure: true,
      maxAge: 86400000,
    },
  })
);
app.use("/", indexRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
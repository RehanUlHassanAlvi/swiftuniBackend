const { query } = require("../utils/db");
const { returnUpdatedDataArray } = require("../utils/db");
module.exports.checkSession = async (req, res, next) => {
  if (!req.session.userID) {
    console.log(req.session.userID);
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      responseCode: 501,
      message: "User Session Expired or Not Found",
      response: "",
    });
  }
  console.log(req.session.userID);
  const dataArray = await returnUpdatedDataArray();
  if (dataArray.includes(req.session.userID)) {
    return res.json({
      responseCode: 501,
      message: "Your Account has been blocked by Admin. Contact Support",
      response: "",
    });
  }
  const { rows } = await query("SELECT sessionid FROM public.users WHERE id = $1", [req.session.userID]);
  if (!rows[0] || rows[0].sessionid !== req.session.sessionid) {
    res.setHeader(
      "Strict-Transport-Security", 
      "max-age=31536000; includeSubDomains"
    );
    req.session.destroy((err) => {
      if (err) {
        result = {
          responseCode: 300,
          message: "Unable to logg out User",
          response: "",
        };
      } else {
        result = {
          responseCode: 200,
          message: "User logged out successfully",
          response: "",
        };
      }
    });
    return res.json({
      responseCode: 501,
      message: "Session Invalid - Please login again",
      response: ""
    });
  }
  next();
};

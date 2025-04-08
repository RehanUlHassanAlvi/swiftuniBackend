const { query } = require("../utils/db");

module.exports.checkSession = async (req, res, next) => {
  const { rows } = await query("select * from public.check_admin($1)", [
    req.session.adminID,
  ]);

  if (!req.session.adminID || !rows[0].check_admin) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      responseCode: 501,
      message: "Admin Session Expired or Not Found",
      response: "",
    });
  }
  next();
};

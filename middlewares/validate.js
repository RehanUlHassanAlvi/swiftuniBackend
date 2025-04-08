const { query } = require("../utils/db");

module.exports.checkAdminPermission = () => {
  return async (req, res, next) => {
    try {
      const { adminID } = req.session;
      const { permission_Id } = req.query;
      if (adminID == 1) {
        return next();
      }
      if (!permission_Id) {
        return res.json({
          responseCode: 500,
          message: "You don't have access to perform this action.",
          response: "",
        });
      }
      const { rows } = await query(
        `select * from public.check_admin_permission($1, $2)`,
        [adminID, permission_Id]
      );
      if (rows[0].check_admin_permission) {
        return next();
      } else {
        return res.json({
          responseCode: 500,
          message: "You don't have access to perform this action.",
          response: "",
        });
      }
    } catch (error) {
      console.log(error.messge);
      return res.json({
        responseCode: 500,
        message: error.message,
        response: "",
      });
    }
  };
};

module.exports.checkAdminPortalPermission = () => {
  return async (req, res, next) => {
    try {
      const { portalID } = req.session;
      if (portalID == 1) {
        return next();
      } else {
        return res.json({
          responseCode: 500,
          message: "You don't have access to perform this action.",
          response: "",
        });
      }
    } catch (error) {
      console.log(error.messge);
      return res.json({
        responseCode: 500,
        message: error.message,
        response: "",
      });
    }
  };
};

const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getPortalInfo = async (values) => {
  try {
    const { rows } = await query(queries.getPortalInfo(),values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Portal:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Portals available",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

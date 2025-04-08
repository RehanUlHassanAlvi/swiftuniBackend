const queries = require("../queries");
const { query } = require("../../../utils/db");

module.exports.getAllPermissions = async (values) => {
  try {
    const { rows } = await query(queries.getAllPermissions());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "All Permissions",
        response: rows[0].get_all_permissions,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Unable to fetch permissions. Try again later.",
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
module.exports.addNewPermissionsAgainstUser = async (values) => {
  try {
    const { rows } = await query(
      queries.addNewPermissionsAgainstUser(),
      values
    );
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Permissions added successfully!!!",
        response: {},
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Unable to add permissions. Try again later.",
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

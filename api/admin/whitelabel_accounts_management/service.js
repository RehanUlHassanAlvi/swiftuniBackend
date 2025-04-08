const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getWhitelabelAccounts = async (values) => {
  try {
    const { rows } = await query(queries.getWhitelabelAccounts(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Accounts",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No accounts found",
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

module.exports.assignAccount = async (values) => {
  try {
    const { rows } = await query(queries.assignAccount(), values);
    if (rows[0].assign_account) {
      const result_object = {
        responseCode: 200,
        message: "Subscription",
        response: rows[0].assign_account,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No Subscription found",
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

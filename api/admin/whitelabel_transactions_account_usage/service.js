const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getWhitelabelTransactionsAccountUsage = async (values) => {
  try {
    const { rows } = await query(queries.getWhitelabelTransactionsAccountUsage(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Transactions Account Usage",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No transactions account usage found",
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

module.exports.getWhitelabelTransactionsAccountUsageAll = async (values) => {
  try {
    const { rows } = await query(queries.getWhitelabelTransactionsAccountUsageAll(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "All Transactions Account Usage",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No all transactions account usage found",
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

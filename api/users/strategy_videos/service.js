const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getStrategyVideo = async (values) => {
  try {
    const { rows } = await query(queries.getStrategyVideo(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Strategy Videos:",
        response: rows.map((row) => {
          const { CreatedAt, UpdatedAt, Core, ...rest } = row;
          return rest;
        }),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Strategy Videos available",
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

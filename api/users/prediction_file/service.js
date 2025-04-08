const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getPredictionFile = async (values) => {
  try {
    const { rows } = await query(queries.getPredictionFile(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Prediction Files:",
        response: rows.map((row) => {
          const { CreatedAt, UpdatedAt, ...rest } = row;
          return rest;
        }),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Prediction Files available",
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

const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.submitAnswer = async (values) => {
  try {
    const { rows } = await query(queries.submitAnswer(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Answer submitted successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to submit IELTS Answer",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};
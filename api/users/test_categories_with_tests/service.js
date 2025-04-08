const queries = require("./queries");
const { query } = require("../../../utils/db");
const utils = require("../../utils/utils");

module.exports.getTestCategoriesWithTests = async () => {
  try {
    const { rows } = await query(queries.getTestCategoriesWithTests());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Test Categories:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Test Categories available",
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
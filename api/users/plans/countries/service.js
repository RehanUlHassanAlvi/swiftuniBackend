const queries = require("./queries");
const { query } = require("../../../../utils/db");

module.exports.getCountries = async () => {
  try {
    const { rows } = await query(queries.getCountries());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Countries:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Countries available",
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

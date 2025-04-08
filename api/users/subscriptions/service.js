const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getSubscription = async () => {
  try {
    const { rows } = await query(queries.getSubscription());
    if (Object.keys(rows).length > 0) {
      const filtered_rows = rows.filter((row) => {
        return row.InActive != true;
      });
      const result_object = {
        responseCode: 200,
        message: "Subscriptions:",
        response: filtered_rows.length
          ? filtered_rows.map((row) => {
              const { CreatedAt, UpdatedAt, ...rest } = row;
              return rest;
            })
          : "No Subscriptions",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Subscriptions available",
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

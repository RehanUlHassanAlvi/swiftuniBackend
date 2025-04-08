const queries = require("./queries");
const { query } = require("../../../../utils/db");
const utils = require("../../../utils/utils");

module.exports.addBookmark = async (values) => {
  try {
    const { rows } = await query(queries.addBookmark(), values);
    if (Object.keys(rows).length > 0) {
      let result_object;

      result_object = {
        responseCode: 200,
        message: "Bookmark added successfully!!!",
        response: rows[0].add_bookmark,
      };

      return result_object;
    } else {
      const error_object = {
        responseCode: 500,
        message: "Something went wrong.",
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

module.exports.deleteBookmark = async (values) => {
  try {
    const { rows } = await query(queries.deleteBookmark(), values);
    if (rows[0].delete_bookmark) {
      const result_object = {
        responseCode: 200,
        message: "Bookmark deleted successsfully!!!",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Unable to delete bookmark.",
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

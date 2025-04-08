const queries = require("./queries");
const { query } = require("../../../../utils/db");

module.exports.addCommentLike = async (values) => {
  try {
    const { rows } = await query(queries.addCommentLike(), values);
    if (rows[0].Status == 1) {
      const result_object = {
        responseCode: 200,
        message: "Comment Liked Successfully",
        response: { ...rows[0], Status: undefined },
      };
      return result_object;
    } else if (rows[0].Status == 0) {
      const error_object = {
        responseCode: 300,
        message: "Comment is already Liked",
        response: { ...rows[0], Status: undefined },
      };
      return error_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went Wrong",
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

module.exports.deleteCommentLike = async (values) => {
  try {
    const { rows } = await query(queries.deleteCommentLike(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Comment unliked successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while unliking Comment",
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

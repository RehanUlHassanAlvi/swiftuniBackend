const queries = require("./queries");
const { query } = require("../../../utils/db");
const utils = require("../../utils/utils");

module.exports.addAppearedQuestions = async (values) => {
  try {
    const { rows } = await query(queries.addAppearedQuestions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Question Appearance added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Question Appearance",
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

module.exports.getAppearedQuestionsOfUser = async (values) => {
  try {
    const { rows } = await query(queries.getAppearedQuestionsOfUser(),values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Question Appearance",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No Question Appearence Exists",
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

module.exports.deleteAppearedQuestions = async (values) => {
  try {
    console.log(values);
    const { rows } = await query(queries.deleteAppearedQuestions(), values);
    if (Object.keys(rows).length > 0) {
      let result_object;
      if (rows[0].delete_appeared_question === 1) {
        result_object = {
          responseCode: 200,
          message: "Past appearence of question deleted successfully!!!",
          response: "",
        };
      } else if (rows[0].delete_appeared_question === -1) {
        result_object = {
          responseCode: 200,
          message: "Cant delete someone's committed appearance",
          response: "",
        };
      } else {
        result_object = {
          responseCode: 500,
          message: "Unable to delete question appearance",
          response: "",
        };
      }

      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Test question appearance",
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

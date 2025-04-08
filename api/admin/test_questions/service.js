const queries = require("./queries");
const { query } = require("../../../utils/db");
const utils = require("../../utils/utils");

module.exports.getTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Test Questions:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Test Questions available",
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

module.exports.addAndUpdateTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.addAndUpdateTestQuestions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Question in Test added or updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message:
          "Something went wrong while adding or updating Question in Test",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Question already exists",
        response: "",
      };
      return error_object;
    }
    if (error.code == 23503) {
      const error_object = {
        responseCode: 500,
        message:
          "All Questions should be available which you are trying to add",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.deleteTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.deleteTestQuestions(), values);
    if (rows[0].delete_test_questions_by_test_id) {
      const result_object = {
        responseCode: 200,
        message: "Test Questions Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Test Questions",
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

module.exports.updateOrderIdTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.updateOrderIdTestQuestions(), values);
    if (rows[0].update_order_id_test_questions) {
      const result_object = {
        responseCode: 200,
        message: "Test Question's Order ID updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Test Question's Order ID",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "User already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.getTestQuestionsByName = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestionsByName(), values);
    console.log("ROWS", rows);
    if (Object.keys(rows).length > 0) {
      const filteredRows = rows[0]
        .get_test_questions_of_user_by_test_name_for_admin.test_questions
        ? rows[0].get_test_questions_of_user_by_test_name_for_admin.test_questions.map(
            (row) => {
              const { BeginningTime, TotalTime, ...rest } = row;
              if (BeginningTime !== null) {
                rest.BeginningTime = BeginningTime;
              }

              if (TotalTime !== null) {
                rest.TotalTime = TotalTime;
              }
              return rest;
            }
          )
        : [];
      const result_object = {
        responseCode: 200,
        message: "Test Questions:",
        totalQuestions:
          rows[0].get_test_questions_of_user_by_test_name_for_admin
            .total_questions,
        response: filteredRows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Test Questions available",
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

module.exports.getTestQuestionsWithOptions = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestionsWithOptions(), values);
    console.log("ROWS", rows);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Question Detail:",
        response:
          rows.length > 0
            ? {
                ...rows[0],
                AudioObject: undefined,
                QuestionStatement: rows[0].QuestionStatement
                  ? rows[0].QuestionStatement
                  : undefined,
                OptionNames: rows[0].OptionNames
                  ? JSON.parse(rows[0].OptionNames)
                  : undefined,
                AnswerNames: rows[0].AnswerNames
                  ? JSON.parse(rows[0].AnswerNames)
                  : undefined,
                AudioObjects:
                  rows[0].AudioObject === null
                    ? undefined
                    : JSON.parse(rows[0].AudioObject),
                MajorAspects: rows[0].MajorAspects
                  ? JSON.parse(rows[0].MajorAspects)
                  : undefined,
                MinorAspects: rows[0].MinorAspects
                  ? JSON.parse(rows[0].MinorAspects)
                  : undefined,
                OptionText: rows[0].OptionText ? rows[0].OptionText : undefined,
                QuestionImage: rows[0].QuestionImage
                  ? rows[0].QuestionImage
                  : undefined,
                OptionUId: rows[0].OptionId ? rows[0].OptionId : undefined,
              }
            : null,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Questions available",
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

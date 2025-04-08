const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestions(), values);
    if (Object.keys(rows).length > 0) {
      const filteredRows = rows.map((row) => {
        const { TestQuestionTableId, ...rest } = row;
        return rest;
      });
      const result_object = {
        responseCode: 200,
        message: "Test Questions:",
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

module.exports.getTestQuestionsByName = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestionsByName(), values);
    if (Object.keys(rows).length > 0) {
      const filteredRows = rows[0].get_test_questions_of_user_by_test_name
        .test_questions
        ? rows[0].get_test_questions_of_user_by_test_name.test_questions.map(
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
          rows[0].get_test_questions_of_user_by_test_name.total_questions,
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

module.exports.dashboardSearch = async (values) => {
  try {
    const { rows } = await query(queries.dashboardSearch(), values);
    if (Object.keys(rows).length > 0) {
      const filteredRows = rows[0].dashboard_search_questions
        .test_questions
        ? rows[0].dashboard_search_questions.test_questions.map(
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
        totalQuestions: rows[0].dashboard_search_questions.total_questions,
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

module.exports.resetAttemptedTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.resetAttemptedTestQuestions(), values);
    console.log(rows);
    if (rows[0].reset_practice_questions_of_user) {
      const result_object = {
        responseCode: 200,
        message: "Attempted Test Questions Reset Successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while resetting Attempted Test Questions",
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


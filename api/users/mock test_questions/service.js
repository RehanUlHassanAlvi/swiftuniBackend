const queries = require("./queries");
const { query } = require("../../../utils/db");
const utils = require("../../utils/utils");

module.exports.getTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestions(), values);
    if (Object.keys(rows).length > 0) {
      if (rows[0].MockTestAttemptId == null) {
        const result_object = {
          responseCode: 400,
          message: "You have already started this mock test",
          response: "",
        };
        return result_object;
      }
      const obj = rows.map((item) => {
        const { MockTestAttemptId, ...remain } = item;
        return remain;
      });
      const result_object = {
        responseCode: 200,
        message: "Mock Test Questions:",
        response: { MockTestAttemptId: rows[0].MockTestAttemptId, obj },
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Mock Test Questions available",
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

module.exports.getPendingTestQuestions = async (values) => {
  try {
    const { rows } = await query(queries.getPendingTestQuestions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test Questions:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Mock Test Questions available",
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

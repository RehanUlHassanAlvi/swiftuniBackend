const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getAttemptedQuestionsByQuestionId = async (values) => {
  try {
    const { rows } = await query(
      queries.getAttemptedQuestionsByQuestionId(),
      values
    );
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Test Questions:",
        response: rows.map((row) => ({
          AttemptedAnswers: row.AttemptedAnswers.map((newrow) => ({
            ...newrow,
            UsersResponse: newrow.UsersResponse
              ? JSON.parse(newrow.UsersResponse)
              : null,
          })),
          // ...row,
          OptionNames: row.OptionNames
            ? JSON.parse(row.OptionNames)
            : undefined,
          AnswerNames: row.AnswerNames
            ? JSON.parse(row.AnswerNames)
            : undefined,
        })),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "You haven't attempted this question",
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

module.exports.getAttemptedQuestionsOfOthersByQuestionId = async (values) => {
  try {
    const { rows } = await query(
      queries.getAttemptedQuestionsOfOthersByQuestionId(),
      values
    );
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Test Questions:",
        response: rows.map((row) => ({
          AttemptedAnswers: row.AttemptedAnswers.map((newrow) => ({
            ...newrow,
            UsersResponse: newrow.UsersResponse
              ? JSON.parse(newrow.UsersResponse)
              : null,
          })),
          // ...row,
          OptionNames: row.OptionNames
            ? JSON.parse(row.OptionNames)
            : undefined,
          AnswerNames: row.AnswerNames
            ? JSON.parse(row.AnswerNames)
            : undefined,
        })),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "This Question is not attempted by other users",
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

module.exports.addAttemptedQuestions = async (values) => {
  try {
    const { rows } = await query(queries.addAttemptedQuestions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Question Attempted successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while attempting question",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23503) {
      const error_object = {
        responseCode: 500,
        message: "Question has been deleted or doesnt exist",
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

module.exports.getTestQuestionsWithOptions = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestionsWithOptions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Questions:",
        response:
          rows.length > 0
            ? {
                ...rows[0],
                OptionNames: rows[0].OptionNames
                  ? JSON.parse(rows[0].OptionNames)
                  : null,
                AnswerNames: rows[0].AnswerNames
                  ? JSON.parse(rows[0].AnswerNames)
                  : null,
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

module.exports.deleteAttemptedQuestions = async (values) => {
  try {
    const { rows } = await query(queries.deleteAttemptedQuestions(), values);
    if (rows[0].delete_attempted_question) {
      const result_object = {
        responseCode: 200,
        message: "Result deleted successsfully!!!",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Unable to delete result.",
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

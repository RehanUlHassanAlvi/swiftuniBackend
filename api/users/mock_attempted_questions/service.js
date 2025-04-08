const queries = require("./queries");
const { query } = require("../../../utils/db");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const {
  aws: {
    aws_access_key_id,
    aws_secret_access_key,
    aws_s3_bucket_name,
    aws_s3_music_bucket_region,
  },
} = require("../../../conf/config");

const s3Client = new S3Client({
  region: aws_s3_music_bucket_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});
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

module.exports.addTimeoutAttemptedQuestions = async (values) => {
  try {
    const { rows } = await query(
      queries.addTimeoutAttemptedQuestions(),
      values
    );
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

module.exports.getSignedURL = async () => {
  try {
    let key = `audios/${Date.now().toString()}.mp3`;

    const expiresIn = 7 * 24 * 60 * 60; // 3600
    const command = new PutObjectCommand({
      Bucket: aws_s3_bucket_name,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    const result_object = {
      responseCode: 200,
      message: "Signed URL:",
      response: signedUrl,
      key: key,
    };
    return result_object;
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

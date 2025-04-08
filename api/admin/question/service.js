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
module.exports.getQuestion = async (values) => {
  try {
    const { rows } = await query(queries.getQuestion(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Questions:",
        response: rows.map((row) => ({
          ...row,
          AudioObject: undefined,
          QuestionStatement: row.QuestionStatement
            ? row.QuestionStatement
            : undefined,
          AudioObjects: row.AudioObject
            ? JSON.parse(row.AudioObject)
            : undefined,
          OptionNames: row.OptionNames
            ? JSON.parse(row.OptionNames)
            : undefined,
          AnswerNames: row.AnswerNames
            ? JSON.parse(row.AnswerNames)
            : undefined,
          MajorAspects: row.MajorAspects
            ? JSON.parse(row.MajorAspects)
            : undefined,
          MinorAspects: row.MinorAspects
            ? JSON.parse(row.MinorAspects)
            : undefined,
          OptionText: row.OptionText ? row.OptionText : undefined,
        })),
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

module.exports.addQuestion = async (values) => {
  try {
    const { rows } = await query(queries.addQuestion(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Question added successfully",
        questionId: rows[0].add_question,
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Question",
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
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updateQuestion = async (values) => {
  try {
    const { rows } = await query(queries.updateQuestion(), values);
    if (rows[0].update_question) {
      const result_object = {
        responseCode: 200,
        message: "Question updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Question",
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
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updateQuestionPredition = async (values) => {
  try {
    const { rows } = await query(queries.updateQuestionPredition(), values);
    if (rows[0].update_question_prediction) {
      const result_object = {
        responseCode: 200,
        message: "Question prediction updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Question prediction",
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
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.deleteQuestion = async (values) => {
  try {
    const { rows } = await query(queries.deleteQuestion(), values);
    if (rows[0].delete_question) {
      const result_object = {
        responseCode: 200,
        message: "Question Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Question",
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

module.exports.getSignedURL = async (type) => {
  try {
    let key;
    if (type) {
      key = `audios/${Date.now().toString()}.${type}`;
    } else {
      key = `audios/${Date.now().toString()}.mp3`;
    }

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

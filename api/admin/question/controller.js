const service = require("./service");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const multer = require("multer");

const {
  aws: {
    aws_access_key_id,
    aws_secret_access_key,
    aws_s3_bucket_name,
    aws_s3_region,
  },
} = require("../../../conf/config");

const s3Client = new S3Client({
  region: aws_s3_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});

module.exports.getQuestion = async (req, res, next) => {
  try {
    const { page = 1, page_size = 10 } = req.query;

    const offset = (page - 1) * page_size;

    const values = [page_size, offset];

    const result = await service.getQuestion(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.getSignedURL = async (req, res, next) => {
  try {
    const { type } = req.query;
    const result = await service.getSignedURL(type);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.addQuestion = async (req, res, next) => {
  try {
    const {
      question_name,
      question_statement,
      total_marks,
      // audio_text,
      audio_objects,
      major_aspects,
      minor_aspects,
      test_id,
      question_image,
      prediction,
      difficulty_level
    } = req.body;
    values = [
      question_name,
      question_statement,
      total_marks,
      // audio_text,
      audio_objects ? JSON.stringify(audio_objects) : null,
      major_aspects ? JSON.stringify(major_aspects) : null,
      minor_aspects ? JSON.stringify(minor_aspects) : null,
      test_id,
      question_image,
      prediction,
      difficulty_level,
    ];

    const result = await service.addQuestion(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.updateQuestion = async (req, res, next) => {
  try {
    const {
      question_id,
      question_name,
      question_statement,
      total_marks,
      // audio_text,
      audio_objects,
      major_aspects,
      minor_aspects,
      test_id,
      question_image,
      prediction,
      difficulty_level
    } = req.body;
    values = [
      question_id,
      question_name,
      question_statement,
      total_marks,
      // audio_text,
      audio_objects ? JSON.stringify(audio_objects) : null,
      major_aspects ? JSON.stringify(major_aspects) : null,
      minor_aspects ? JSON.stringify(minor_aspects) : null,
      test_id,
      question_image,
      prediction,
      difficulty_level
    ];

    const result = await service.updateQuestion(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.updateQuestionPredition = async (req, res, next) => {
  try {
    const { question_id } = req.body;
    values = [question_id];

    const result = await service.updateQuestionPredition(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.deleteQuestion = async (req, res, next) => {
  try {
    const { question_id } = req.query;

    const values = [question_id];

    const result = await service.deleteQuestion(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

async function uploadAudioToS3(key, audioStream) {
  const params = {
    Bucket: aws_s3_bucket_name,
    Key: key,
    Body: audioStream,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const s3Url = `https://${aws_s3_bucket_name}.s3.amazonaws.com/${key}`;
    const s3key = key;
    return {
      s3Url: s3Url,
      s3key: s3key,
    };
  } catch (error) {
    console.error("Error uploading audio to S3:", error);
    return false;
  }
}

async function deleteAudioFromS3(key) {
  const params = {
    Bucket: aws_s3_bucket_name,
    Key: key,
  };
  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting audio from S3:", error);
    return false;
  }
}

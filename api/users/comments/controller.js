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

module.exports.getComment = async (req, res, next) => {
  try {
    const { test_question_id } = req.query;
    const values = [test_question_id , req.session.userID];
    const result = await service.getComment(values);
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

module.exports.addComment = async (req, res, next) => {
  try {
    let values;
    const { comment, comment_img, category, test_question_id, parent_id } =
      req.body;

    if (req.files[0]) {
      const key =
        Date.now() +
        "_" +
        req.files[0].fieldname +
        "_" +
        req.files[0].originalname;

      const imageUpload = await uploadImageToS3(key, req.files[0].buffer);
      if (!imageUpload) {
        res.setHeader(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains"
        );
        return res.json({
          message: "Something Went Wrong",
        });
      }
      values = [
        comment,
        imageUpload.s3Url,
        category,
        req.session.userID,
        test_question_id,
        parent_id,
      ];
    } else {
      values = [
        comment,
        null,
        category,
        req.session.userID,
        test_question_id,
        parent_id,
      ];
    }

    const result = await service.addComment(values);
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

module.exports.deleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.query;

    const values = [comment_id];

    const result = await service.deleteComment(values);
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

async function uploadImageToS3(key, audioStream) {
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

const service = require("./service");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const {
  aws: {
    aws_access_key_id,
    aws_secret_access_key,
    aws_s3_templates_bucket_name,
    aws_s3_region,
  },
} = require("../../../conf/config");

module.exports.getPredictionFile = async (req, res, next) => {
  try {
    const { core } = req.query;
    const result = await service.getPredictionFile([core]);
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

const service = require('./service');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const path = require('path');
const {
  aws: {
    aws_access_key_id,
    aws_secret_access_key,
    aws_s3_templates_bucket_name,
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

module.exports.getTests = async (req, res, next) => {
  try {
    const result = await service.getAllTestsService();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.addTests = async (req, res, next) => {
  try {
    const result = await service.addTests(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateTests = async (req, res, next) => {
  try {
    const result = await service.updateTests(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.deleteTests = async (req, res, next) => {
  try {
    const result = await service.deleteTests(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.createTest = async (req, res) => {
  try {
    const testData = req.body;

    const result = await service.createTestService(testData);

    return res.status(200).json({
      responseCode: 200,
      message: "IELTS Test created successfully",
      response: result,
    });
  } catch (error) {
    console.error("Error creating test:", error);
    return res.status(500).json({
      responseCode: 500,
      message: "Internal Server Error",
      response: "",
    });
  }
};


module.exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${fileExtension}`;

    const params = {
      Bucket: aws_s3_templates_bucket_name,
      Key: `uploads/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));

    const imageUrl = `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/uploads/${fileName}`;

    res.json({ imageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};
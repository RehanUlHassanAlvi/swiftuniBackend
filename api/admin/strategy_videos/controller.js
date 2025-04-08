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

const s3Client = new S3Client({
  region: aws_s3_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});

module.exports.getStrategyVideo = async (req, res, next) => {
  try {
    const { core } = req.query;
    const result = await service.getStrategyVideo([core, req.session.portalID]);
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

module.exports.addStrategyVideo = async (req, res, next) => {
  try {
    let values;
    const key =
      Date.now() +
      "_" +
      req.files[0].fieldname +
      "_" +
      req.files[0].originalname;

    const { title, author, yt_link, category, priority, language, core } =
      req.body;

    const pdfUpload = await uploadPdfToS3(key, req.files[0].buffer, core);
    if (!pdfUpload) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json({
        message: "Something Went Wrong",
      });
    }
    values = [
      title,
      author,
      yt_link,
      category,
      priority,
      language,
      core,
      pdfUpload.s3Url,
      req.session.portalID,
    ];
    const result = await service.addStrategyVideo(values);
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
      message: ex.message,
    });
  }
};

module.exports.updateStrategyVideo = async (req, res, next) => {
  try {
    let values;
    if (req.files[0]) {
      const key =
        Date.now() +
        "_" +
        req.files[0].fieldname +
        "_" +
        req.files[0].originalname;

      const {
        video_id,
        title,
        author,
        yt_link,
        category,
        priority,
        language,
        core,
        thumbnail,
        pre_file_url,
      } = req.body;

      const pdfUpload = await uploadPdfToS3(key, req.files[0].buffer, core);
      console.log(pdfUpload);
      if (!pdfUpload) {
        res.setHeader(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains"
        );
        return res.json({
          message: "Something Went Wrong",
        });
      }
      if (pre_file_url) {
        const pdfDelete = await deletePdfFromS3(pre_file_url);
        console.log("Here");
      }
      values = [
        video_id,
        title,
        author,
        yt_link,
        category,
        priority,
        language,
        core,
        pdfUpload.s3Url,
        req.session.portalID,
      ];
    } else {
      const {
        video_id,
        title,
        author,
        yt_link,
        category,
        priority,
        language,
        core,
        pre_file_url,
      } = req.body;

      values = [
        video_id,
        title,
        author,
        yt_link,
        category,
        priority,
        language,
        core,
        pre_file_url,
        req.session.portalID,
      ];
    }
    const result = await service.updateStrategyVideo(values);
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

module.exports.deleteStrategyVideo = async (req, res, next) => {
  try {
    const { video_id } = req.query;

    const values = [video_id];

    const result = await service.deleteStrategyVideo(values);
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

async function uploadPdfToS3(key, pdfStream, is_template) {
  const params = {
    Bucket: aws_s3_templates_bucket_name,
    Key:
      is_template === true
        ? "strategy_core/" + key
        : "strategy_academic/" + key,
    Body: pdfStream,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(
      `Pdf uploaded successfully to ${aws_s3_templates_bucket_name}/${key}`
    );
    const s3Url =
      is_template === true
        ? `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/strategy_core/${key}`
        : `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/strategy_academic/${key}`;
    return {
      s3Url: s3Url,
    };
  } catch (error) {
    console.error("Error uploading Pdf to S3:", error);
    return false;
  }
}

async function deletePdfFromS3(key) {
  let keytosend = key.replace(
    `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/`,
    ""
  );
  const params = {
    Bucket: aws_s3_templates_bucket_name,
    Key: keytosend,
  };
  console.log(params);
  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log(
      `Pdf deleted successfully from ${aws_s3_templates_bucket_name}/${key}`
    );
    return true;
  } catch (error) {
    console.error("Error deleting Pdf from S3:", error);
    return false;
  }
}

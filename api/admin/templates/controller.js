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

module.exports.getTemplate = async (req, res, next) => {
  try {
    const result = await service.getTemplate([true, req.session.portalID]);
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

module.exports.getGrammerTemplate = async (req, res, next) => {
  try {
    const result = await service.getGrammerTemplate([
      false,
      req.session.portalID,
    ]);
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

module.exports.addTemplate = async (req, res, next) => {
  try {
    let values;
    const key =
      Date.now() +
      "_" +
      req.files[0].fieldname +
      "_" +
      req.files[0].originalname;

    const { name, is_template } = req.body;

    const pdfUpload = await uploadPdfToS3(
      key,
      req.files[0].buffer,
      is_template
    );
    if (!pdfUpload) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json({
        message: "Something Went Wrong",
      });
    }
    values = [name, pdfUpload.s3Url, is_template, req.session.portalID];
    const result = await service.addTemplate(values);
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

module.exports.updateTemplate = async (req, res, next) => {
  try {
    let values;
    if (req.files[0]) {
      const key =
        Date.now() +
        "_" +
        req.files[0].fieldname +
        "_" +
        req.files[0].originalname;
      const { template_id, name, pre_pdf_url, is_template } = req.body;

      const pdfUpload = await uploadPdfToS3(
        key,
        req.files[0].buffer,
        is_template
      );
      if (!pdfUpload) {
        res.setHeader(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains"
        );
        return res.json({
          message: "Something Went Wrong",
        });
      }
      if (pre_pdf_url) {
        const pdfDelete = await deletePdfFromS3(pre_pdf_url);
      }
      values = [
        template_id,
        name,
        pdfUpload.s3Url,
        is_template,
        req.session.portalID,
      ];
      console.log(values);
    } else {
      const { template_id, name, pre_pdf_url, is_template } = req.body;

      values = [template_id, name, pre_pdf_url, is_template];
    }
    const result = await service.updateTemplate(values);
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

module.exports.deleteTemplate = async (req, res, next) => {
  try {
    const { template_id } = req.query;

    const values = [template_id];

    const result = await service.deleteTemplate(values);
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
    Key: is_template === true ? "templates/" + key : "grammars/" + key,
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
        ? `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/templates/${key}`
        : `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/grammars/${key}`;
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

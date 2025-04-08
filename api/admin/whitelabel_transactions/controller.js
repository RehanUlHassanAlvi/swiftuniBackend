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

module.exports.subscribePackageUsingBankWhitelabel = async (req, res, next) => {
  try {
    const { adminID } = req.session;
    const {
      plan_id,
      promocode_id,
      no_of_accounts_purchased,
      amount_paid,
      reference_number,
      location,
    } = req.body;

    let values;
    if (req.files.length > 0) {
      const key =
        Date.now() +
        "_" +
        req.files[0].fieldname +
        "_" +
        req.files[0].originalname;

      const receiptUpload = await uploadReceiptToS3(key, req.files[0].buffer);
      values = [
        adminID,
        plan_id,
        "pending",
        null,
        null,
        null,
        promocode_id,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        receiptUpload.s3Url,
        no_of_accounts_purchased,
        "0",
        req.session.portalID,
        amount_paid,
        reference_number,
        location,
      ];
    }
    else {
      values = [
        adminID,
        plan_id,
        "pending",
        null,
        null,
        null,
        promocode_id,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        no_of_accounts_purchased,
        "0",
        req.session.portalID,
        amount_paid,
        reference_number,
        location,
      ];
    }
    console.log("values", values);
    const result = await service.subscribePackageUsingBankWhitelabel(values);
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

module.exports.paymentSuccessWhitelabel = async (req, res, next) => {
  try {
    const { adminID } = req.session;
    const { plan_id, order_id } = req.body;
    let values;
    values = [adminID, plan_id, order_id];
    const result = await service.paymentSuccessWhitelabel(req, values);
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

module.exports.superadminBuy = async (req, res, next) => {
  try {
    const { adminID } = req.session;
    const { plan_id, number_of_accounts_purchased, portal_id, bought_by_and_reason, manual } = req.body;
    let values;
    values = [adminID, plan_id, number_of_accounts_purchased, portal_id, bought_by_and_reason, manual];
    const result = await service.superadminBuy(req, values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
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

async function uploadReceiptToS3(key, pdfStream) {
  const params = {
    Bucket: aws_s3_templates_bucket_name,
    Key: "whitelabel-receipts/" + key,
    Body: pdfStream,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(
      `Receipt uploaded successfully to ${aws_s3_templates_bucket_name}/${key}`
    );
    const s3Url = `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/whitelabel-receipts/${key}`;
    return {
      s3Url: s3Url,
    };
  } catch (error) {
    console.error("Error uploading Receipt to S3:", error);
    return false;
  }
}

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
module.exports.subscribePackageUsingCreaditCard = async (req, res, next) => {
  try {
    const { userID } = req.session;
    const { subscription_id, promocode_id } = req.body;

    const values = [
      userID,
      subscription_id,
      "pending",
      "",
      "",
      "",
      promocode_id,
      "",
      true,
    ];
    const result = await service.subscribePackageUsingCreaditCard(values);
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

module.exports.subscribePackageUsingBank = async (req, res, next) => {
  try {
    const { userID } = req.session;
    const { subscription_id, promocode_id } = req.body;

    let values;
    const key =
      Date.now() +
      "_" +
      req.files[0].fieldname +
      "_" +
      req.files[0].originalname;

    const receiptUpload = await uploadReceiptToS3(key, req.files[0].buffer);
    // if (!receiptUpload) {
    //   res.setHeader(
    //     "Strict-Transport-Security",
    //     "max-age=31536000; includeSubDomains"
    //   );
    //   return res.json({
    //     message: "Something Went Wrong",
    //   });
    // }

    values = [
      userID,
      subscription_id,
      "pending",
      null,
      null,
      null,
      promocode_id,
      receiptUpload.s3Url,
      false,
      null,
      null,
      null,
      null,
      req.session.portalID,
    ];
    const result = await service.subscribePackageUsingBank(values);
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

module.exports.approveUserTransaction = async (req, res, next) => {
  try {
    const { transaction_id } = req.query;
    const result = await service.approveUserTransaction([transaction_id]);
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

module.exports.userTransactions = async (req, res, next) => {
  try {
    const { user_id, reference_number } = req.query;
    const result = await service.userTransactions([user_id, reference_number]);
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

module.exports.allTransactions = async (req, res, next) => {
  try {
    const {
      is_approved,
      page = 1,
      page_size = 10,
      reference_number,
      portal_id
    } = req.query;

    const offset = (page - 1) * page_size;
    const values = [page_size, offset, is_approved, reference_number, portal_id];
    const result = await service.allTransactions(values);
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

module.exports.superadminBuySubscription = async (req, res, next) => {
  try {
    const { subscription_id, user_id, bought_by_and_reason } = req.body;
    let values;
    values = [subscription_id, user_id, bought_by_and_reason];
    const result = await service.superadminBuySubscription(req, values);
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
  console.log("Here");
  const params = {
    Bucket: aws_s3_templates_bucket_name,
    Key: "receipts/" + key,
    Body: pdfStream,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(
      `Receipt uploaded successfully to ${aws_s3_templates_bucket_name}/${key}`
    );
    const s3Url = `https://${aws_s3_templates_bucket_name}.s3.${aws_s3_region}.amazonaws.com/receipts/${key}`;
    return {
      s3Url: s3Url,
    };
  } catch (error) {
    console.error("Error uploading Receipt to S3:", error);
    return false;
  }
}

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
    aws_s3_bucket_name,
    aws_s3_region,
  },
} = require("../../conf/config");

const s3Client = new S3Client({
  region: aws_s3_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});

module.exports.resendEmailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    const values = [email.toLowerCase()];

    const result = await service.resendEmailVerification(values);
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

module.exports.addUser = async (req, res, next) => {
  try {
    const { name, email, password, countrycode, phonenumber, portal_id } =
      req.body;

    const values = [
      name,
      email.toLowerCase(),
      password,
      countrycode,
      phonenumber,
      portal_id,
    ];

    const result = await service.addUser(values);
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

module.exports.userDelete = async (req, res, next) => {
  try {
    const { is_deleted } = req.body;

    const values = [req.session.userID, is_deleted];

    const result = await service.userDelete(values);
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

module.exports.updateUser = async (req, res, next) => {
  try {
    let values;
    if (req.files[0]) {
      const key =
        Date.now() +
        "_" +
        req.files[0].fieldname +
        "_" +
        req.files[0].originalname;

      const imgUpload = await uploadImageToS3(key, req.files[0].buffer);
      if (!imgUpload) {
        res.setHeader(
          "Strict-Transport-Security",
          "max-age=31536000; includeSubDomains"
        );
        return res.json({
          message: "Something Went Wrong",
        });
      }
      const { name, phonenumber, countrycode, city, pre_img_url } = req.body;
      if (pre_img_url) {
        const imgDelete = await deleteImageFromS3(pre_img_url);
      }
      values = [
        req.session.userID,
        name,
        phonenumber,
        countrycode,
        city,
        imgUpload.s3Url,
      ];
      console.log(values);
    } else {
      const { name, phonenumber, countrycode, city, pre_img_url } = req.body;
      values = [
        req.session.userID,
        name,
        phonenumber,
        countrycode,
        city ? city : null,
        pre_img_url ? pre_img_url : null,
      ];
    }
    const result = await service.updateUser(values);
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

module.exports.loginUser = async (req, res, next) => {
  try {
    const { email, password, portal_id } = req.body;

    const values = [email.toLowerCase(), password, portal_id, req.sessionID , new Date(Date.now() + 86400000).toISOString()];

    const result = await service.loginUser(req, values);
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

module.exports.checkSession = async (req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  return res.json({
    responseCode: 200,
    message: "Session is good to go",
    response: "",
  });
};

module.exports.userSignUpWithAuth = async (req, res, next) => {
  try {
    const { email, name, google_id, portal_id } = req.body;
    const values = [email.toLowerCase(), name, google_id, portal_id];
    const result = await service.userSignUpWithAuth(req, values);
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
    res.json(result);
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

module.exports.userLoginWithAuth = async (req, res, next) => {
  try {
    const { email, auth_id, portal_id } = req.body;

    const values = [email.toLowerCase(), auth_id, portal_id];
    const result = await service.userLoginWithAuth(req, values);
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
    res.json(result);
  } catch (ex) {
    process.emit("error", ex);
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const values = [token];

    const result = await service.verifyEmail(values);
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

module.exports.verifyPasswordtoken = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const values = [token, password];

    const result = await service.verifyPasswordtoken(values);
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

module.exports.passwordReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    const values = [email.toLowerCase()];

    const result = await service.passwordReset(values);
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

module.exports.userAnalysis = async (req, res, next) => {
  try {
    const { is_ptecore } = req.query;
    console.log(typeof is_ptecore);
    const values = [req.session.userID, is_ptecore];

    const result = await service.userAnalysis(values);
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

module.exports.userStoredAnalysis = async (req, res, next) => {
  try {
    const { is_ptecore } = req.query;
    const values = [req.session.userID, is_ptecore];

    const result = await service.userStoredAnalysis(values);
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

module.exports.averageScore = async (req, res, next) => {
  try {
    const { userID } = req.session;
    const values = [userID];

    const result = await service.averageScore(values);
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

module.exports.updateExamDate = async (req, res, next) => {
  try {
    const { exam_date, exam_target } = req.body;
    const values = [req.session.userID, exam_date, exam_target];

    const result = await service.updateExamDate(values);
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

module.exports.sessionDestroy = async (req, res, next) => {
  try {
    const values = [req.session.userID];
    const result = await service.sessionDestroy(values);
    
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );

    req.session.destroy((err) => {
      if (err) {
        return res.json({
          responseCode: 300,
          message: "Unable to log out User",
          response: "",
        });
      }
      return res.json(result || {
        responseCode: 200,
        message: "User logged out successfully",
        response: "",
      });
    });
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

module.exports.permanentlyDeleteUser = async (req, res, next) => {
  try {
    const values = [req.session.userID];

    const result = await service.permanentlyDeleteUser(values);
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

module.exports.getExamDate = async (req, res, next) => {
  try {
    const values = [req.session.userID];

    const result = await service.getExamDate(values);
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

module.exports.checkTokens = async (req, res, next) => {
  try {
    const { userID } = req.session;
    const values = [userID];
    const result = await service.checkTokens(values);
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

module.exports.subtractTokens = async (req, res, next) => {
  try {
    const { type } = req.body;
    const values = [req.session.userID, type];
    const result = await service.subtractTokens(values);
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

module.exports.userGoogleResponse = async (req, res, next) => {
  try {
    const { access_token } = req.body;
    const values = [access_token];
    const result = await service.userGoogleResponse(values);
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
} 

async function uploadImageToS3(key, imageStream) {
  const params = {
    Bucket: aws_s3_bucket_name,
    Key: "users/" + key,
    Body: imageStream,
  };
  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(`Image uploaded successfully to ${aws_s3_bucket_name}/${key}`);
    const s3Url = `https://${aws_s3_bucket_name}.s3.${aws_s3_region}.amazonaws.com/users/${key}`;
    return {
      s3Url: s3Url,
    };
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    return false;
  }
}

async function deleteImageFromS3(key) {
  let keytosend = key.replace(
    `https://${aws_s3_bucket_name}.s3.${aws_s3_region}.amazonaws.com/`,
    ""
  );
  const params = {
    Bucket: aws_s3_bucket_name,
    Key: keytosend,
  };
  console.log(params);
  try {
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log(`Image deleted successfully from ${aws_s3_bucket_name}/${key}`);
    return true;
  } catch (error) {
    console.error("Error deleting image from S3:", error);
    return false;
  }
}

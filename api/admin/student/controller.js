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
} = require("../../../conf/config");

const s3Client = new S3Client({
  region: aws_s3_region,
  credentials: {
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
  },
});

module.exports.getAllStudent = async (req, res, next) => {
  try {
    const { portal_id, name, subscribed, type } = req.query;
    const result = await service.getAllStudent([
      portal_id,
      name,
      subscribed,
      type,
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

module.exports.getStudentData = async (req, res, next) => {
  try {
    const { student_id } = req.query;
    const result = await service.getStudentData([student_id]);
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

module.exports.getStudent = async (req, res, next) => {
  try {
    const { portal_id, name, subscribed, type, branch_name } = req.query;
    const result = await service.getStudent([
      portal_id,
      name,
      subscribed,
      type,
      branch_name,
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

module.exports.getStudentFromTrash = async (req, res, next) => {
  try {
    const { portal_id, name, subscribed, type } = req.query;
    const result = await service.getStudentFromTrash([
      portal_id,
      name,
      subscribed,
      type,
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

module.exports.addStudent = async (req, res, next) => {
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

      const { name, email, password, portal_id, type, target, note } = req.body;
      values = [
        name,
        email,
        password,
        portal_id,
        type,
        target,
        note,
        imgUpload.s3Url,
      ];
      console.log(values);
    } else {
      const { name, email, password, portal_id, type, target, note } = req.body;
      values = [name, email, password, portal_id, type, target, note, null];
    }

    const result = await service.addStudent(values);
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

module.exports.deleteStudent = async (req, res, next) => {
  try {
    const { student_id } = req.query;

    const result = await service.deleteStudent([student_id]);
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

module.exports.deleteStudentFromTrash = async (req, res, next) => {
  try {
    const { student_id } = req.query;

    const result = await service.deleteStudentFromTrash([student_id]);
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

module.exports.updateStudent = async (req, res, next) => {
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

      const {
        student_id,
        name,
        pre_img_url,
        image_of_user,
        password,
        type,
        target,
        note,
      } = req.body;
      if (pre_img_url) {
        const imgDelete = await deleteImageFromS3(pre_img_url);
      }
      values = [
        student_id,
        name,
        imgUpload.s3Url,
        password ? password : null,
        type,
        target,
        note,
      ];
      console.log(values);
    } else {
      const {
        student_id,
        name,
        pre_img_url,
        image_of_user,
        password,
        type,
        target,
        note,
      } = req.body;
      values = [
        student_id,
        name,
        pre_img_url ? pre_img_url : null,
        password,
        type,
        target,
        note,
      ];
    }
    const result = await service.updateStudent(values);
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

module.exports.logoutUserByAdmin = async (req, res, next) => {
  try {
    const { user_id } = req.query;

    const result = await service.logoutUserByAdmin([user_id]);
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
}

module.exports.updateStudentBranch = async (req, res, next) => {
  try {   
    const { user_id, branch_id } = req.body;
    const result = await service.updateStudentBranch([user_id, branch_id]);
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
  }
}

module.exports.getAttemptedMockTests = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const values = [user_id];
    const result = await service.getAttemptedMockTests(values);
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

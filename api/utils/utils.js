const jwt = require("jsonwebtoken");
const queries = require("./queries");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const {
  sendEmail,
  auth,
  passwordAuth,
  frontend,
  aws,
} = require("../../conf/config");
const handlebars = require("handlebars");
let { initializeAndExportArray } = require("../../utils/db");
const { query } = require("../../utils/db");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  credentials: {
    accessKeyId: aws.aws_access_key_id, // store it in .env file to keep it safe
    secretAccessKey: aws.aws_secret_access_key,
  },
  region: aws.aws_s3_region,
});

// const hbs = require("hbs");

exports.sendVerificationEmail = async (values) => {
  try {
    const token = this.generateActivationLinkToken(values);
    if (values.length == 1) {
      const parameters = {
        userName: `${values[0]}`,
        verficationLink: `${frontend.url}verify-email/?token=${token.token}`,
      };
    }
    const parameters = {
      userName: `${values[0]}`,
      verficationLink: `${frontend.url}verify-email/?token=${token.token}`,
    };

    const transporter = nodemailer.createTransport({
      host: sendEmail.host,
      port: parseInt(sendEmail.port),
      // requireTLS: true,
      // tls: {
      //   rejectUnauthorized: true,
      // },
      auth: {
        user: sendEmail.emailUser,
        pass: sendEmail.emailPassword,
      },
    });
    console.log("Transporter", transporter);
    const source = fs.readFileSync(
      path.resolve(__dirname, "..", "..", "views", "emailTemplate.hbs"),
      "utf8"
    );
    const template = handlebars.compile(source);
    const mailOptions = {
      from: sendEmail.emailId,
      to: values[1],
      subject: "Email Verification",
      html: template(parameters),
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        //return;
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.resendVerificationEmail = async (values) => {
  try {
    const token = this.generateActivationLinkToken(values);
    if (values.length == 1) {
      const parameters = {
        userName: `${values[0]}`,
        verficationLink: `${frontend.url}verify-email/?token=${token.token}`,
      };
    }
    const parameters = {
      userName: `${values[0]}`,
      verficationLink: `${frontend.url}verify-email/?token=${token.token}`,
    };

    const transporter = nodemailer.createTransport({
      host: sendEmail.host,
      port: parseInt(sendEmail.port),
      // requireTLS: true,
      // tls: {
      //   rejectUnauthorized: true,
      // },
      auth: {
        user: sendEmail.emailUser,
        pass: sendEmail.emailPassword,
      },
    });
    const source = fs.readFileSync(
      path.resolve(__dirname, "..", "..", "views", "emailTemplate.hbs"),
      "utf8"
    );
    const template = handlebars.compile(source);
    const mailOptions = {
      from: sendEmail.emailId,
      to: values[0],
      subject: "Email Verification",
      html: template(parameters),
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        //return;
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.sendPasswordResetEmail = async (values) => {
  try {
    const token = this.generatePasswordResetToken(values);
    if (values.length == 1) {
      const parameters = {
        userName: `${values[0]}`,
        verficationLink: `${frontend.url}reset-password/?token=${token.token}`,
      };
    }
    const parameters = {
      userName: `${values[0]}`,
      verficationLink: `${frontend.url}reset-password/?token=${token.token}`,
    };

    const transporter = nodemailer.createTransport({
      host: sendEmail.host,
      port: parseInt(sendEmail.port),
      // requireTLS: true,
      // tls: {
      //   rejectUnauthorized: true,
      // },
      auth: {
        user: sendEmail.emailUser,
        pass: sendEmail.emailPassword,
      },
    });
    const source = fs.readFileSync(
      path.resolve(__dirname, "..", "..", "views", "passwordTemplate.hbs"),
      "utf8"
    );
    const template = handlebars.compile(source);
    const mailOptions = {
      from: sendEmail.emailId,
      to: values[0],
      subject: "Reset Password",
      html: template(parameters),
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        //return;
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// FUNCTION TO GENERATE A TOKEN FOR CHANGING PASSWORD CREATED DUE TO ADMIN ADDING OF USER

module.exports.generateActivationLinkToken = (values) => {
  try {
    email_of_user = {
      email: values[1] ? values[1].toLowerCase() : values[0].toLowerCase(),
    };
    const jwtToken = jwt.sign(email_of_user, auth.access_token_secret, {
      algorithm: auth.access_token_algo,
      expiresIn: auth.access_token_expiry,
    });
    return {
      token: jwtToken,
      expiry: new Date(new Date().setHours(new Date().getHours() + 1)),
    };
  } catch (error) {
    return {
      responseCode: 5000,
      message: error.message,
      response: "",
    };
  }
};

module.exports.generatePasswordResetToken = (values) => {
  try {
    email_of_user = {
      email: values[0].toLowerCase(),
    };
    const jwtToken = jwt.sign(email_of_user, passwordAuth.access_token_secret, {
      algorithm: passwordAuth.access_token_algo,
      expiresIn: passwordAuth.access_token_expiry,
    });
    return {
      token: jwtToken,
      expiry: new Date(new Date().setHours(new Date().getHours() + 1)),
    };
  } catch (error) {
    return {
      responseCode: 5000,
      message: error.message,
      response: "",
    };
  }
};

module.exports.checkBlockedUsersArray = (req, res, next) => {
  initializeAndExportArray()
    .then((dataArray) => {
      try {
        if (dataArray.includes(req.session.userID)) {
          return res.json({
            responseCode: 305,
            message: "Your account is been blocked",
            response: "",
          });
        } else {
          next();
        }
      } catch (error) {
        return res.json({
          responseCode: 500,
          message: "Something went wrong",
          response: "",
        });
      }
    })
    .catch((error) => {
      return {
        responseCode: 500,
        message: error.message,
        response: "",
      };
    });
};

module.exports.checkUser = async (values) => {
  try {
    const { rows } = await query(queries.checkUser(), values);
    if (rows[0].check_user) return true;
    else return false;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

exports.uploadToS3 = async (file, key, bucketName) => {
  try {
    const params = {
      Bucket: aws.aws_s3_bucket_name,
      Key: `${key}.${file.mimetype.split("/")[1]}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    const res = await s3Client.send(command);
    if (res)
      return `https://${aws.aws_s3_bucket_name}.s3.amazonaws.com/${params.Key}`;
    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

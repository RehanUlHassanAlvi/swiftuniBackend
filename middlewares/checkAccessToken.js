const jwt = require("jsonwebtoken");
const {
  auth: { access_token_secret, access_token_algo, access_token_expiry },
  passwordAuth,
} = require("../conf/config");

module.exports.verifyAccountPasswordSetupTokenAccess = (values) => {
  if (!values) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log("decode",values)
    const decoded = jwt.verify(values[0], access_token_secret, {
      algorithm: access_token_algo,
    });
    console.log("decode",decoded);
    return {
      responseCode: 2000,
      message: "Token Valiated",
      response: decoded,
    };
    //req.user = decoded;
  } catch (err) {
    const decoded = jwt.decode(values[0]);
    return {
      responseCode: 5000,
      message: "Invalid token",
      response: {
        err: err.message,
        expiredAt: err.expiredAt,
        username: decoded.username,
        firstname: decoded.firstname,
      },
    };
  }
  return next();
};

module.exports.verifyAccountPasswordResetTokenAccess = (values) => {
  if (!values) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(values[0], passwordAuth.access_token_secret, {
      algorithm: passwordAuth.access_token_algo,
    });
    return {
      responseCode: 2000,
      message: "Token Valiated",
      response: decoded,
    };
    //req.user = decoded;
  } catch (err) {
    const decoded = jwt.decode(values[0]);
    return {
      responseCode: 5000,
      message: "Invalid token",
      response: {
        err: err.message,
        expiredAt: err.expiredAt,
        username: decoded.username,
        firstname: decoded.firstname,
      },
    };
  }
  return next();
};

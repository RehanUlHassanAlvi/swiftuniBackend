const queries = require("./queries");
const { query, initializeDeletedUsersArray } = require("../../utils/db");
const {
  verifyAccountPasswordSetupTokenAccess,
  verifyAccountPasswordResetTokenAccess,
} = require("../../middlewares/checkAccessToken");
const utils = require("../utils/utils");
const axios = require("axios");

module.exports.sendVerificationEmail = async (values) => {
  try {
    const res = await utils.sendVerificationEmail(values);
    console.log("Email Sent Successfully");

    const result_object = {
      responseCode: 200,
      message: "Email Sent Successfully",
      // response: rows,
    };
    return result_object;
  } catch (error) {
    console.log("err of email", error.message);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.resendVerificationEmail = async (values) => {
  try {
    const res = await utils.resendVerificationEmail(values);
    const result_object = {
      responseCode: 200,
      message: "Email Sent Successfully",
      // response: rows,
    };
    return result_object;
  } catch (error) {
    console.log("err of email", error.message);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.sendPasswordResetEmail = async (values) => {
  try {
    const res = await utils.sendPasswordResetEmail(values);
    console.log("Email Sent Successfully");

    const result_object = {
      responseCode: 200,
      message: "Email Sent Successfully",
      // response: rows,
    };
    return result_object;
  } catch (error) {
    console.log("err of email", error.message);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.passwordReset = async (values) => {
  try {
    const res = await utils.checkUser(values);
    if (res) {
      const result = await this.sendPasswordResetEmail(values);
      const result_object = {
        responseCode: 200,
        message: "Email Sent for Password Reset",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "User Doesn't Exist",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "User already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.resendEmailVerification = async (values) => {
  try {
    const res = await utils.checkUser(values);
    if (res) {
      const result = await this.resendVerificationEmail(values);
      const result_object = {
        responseCode: 200,
        message: "Email Sent for Email Verfifcation",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "User Doesn't Exist",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "User already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.addUser = async (values) => {
  try {
    const { rows } = await query(queries.addUser(), values);
    if (rows[0].PortalName) {
      const error_object = {
        responseCode: 300,
        message: `User exists in portal ${rows[0].PortalName}`,
        response: "",
      };
      return error_object;
    }
    if (Object.keys(rows).length > 0) {
      const result = await this.sendVerificationEmail(values);
      const academic = this.userAnalysis([rows[0].UserId, false]);
      const pte = this.userAnalysis([rows[0].UserId, true]);
      query(queries.updateUserAnalysis(), [rows[0].UserId, academic, false]);
      query(queries.updateUserAnalysis(), [rows[0].UserId, pte, true]);
      const result_object = {
        responseCode: 200,
        message: "User added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding User",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "User already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updateUser = async (values) => {
  try {
    const { rows } = await query(queries.updateUser(), values);
    if (rows[0].Updated) {
      const result_object = {
        responseCode: 200,
        message: "User updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message:
          "Something went wrong while updating User or ID might not exists",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.userDelete = async (values) => {
  try {
    const { rows } = await query(queries.userDelete(), values);
    if (rows[0].delete_user) {
      initializeDeletedUsersArray();
      const result_object = {
        responseCode: 200,
        message: "User Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting User",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.updateExamDate = async (values) => {
  try {
    const { rows } = await query(queries.updateExamDate(), values);
    if (rows) {
      const result_object = {
        responseCode: 200,
        message: "Exam Date",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Exam date",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.permanentlyDeleteUser = async (values) => {
  try {
    const { rows } = await query(queries.permanentlyDeleteUser(), values);
    if (rows[0].delete_user_permanently) {
      initializeDeletedUsersArray();
      const result_object = {
        responseCode: 200,
        message: "User Deleted Permanently",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting User",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.loginUser = async (req, values) => {
  try {
    const { rows } = await query(queries.loginUser(), values);
    if (rows[0].UserName == 'u-s-e-r-n-a-m-e-f-o-u-n-d-i-n-o-t-h-e-r-p-o-r-t-a-l') {
      const error_object = {
        responseCode: 300,
        message: `User exists in portal ${rows[0].Email}`,
        response: "",
      };
      return error_object;
    }
    else if (rows[0].UserId) {
      if (!rows[0].EmailVerified) {
        const error_object = {
          responseCode: 300,
          message: "Your Email is not verified",
          response: "",
        };
        return error_object;
      }
      if (rows[0].IsDeleted) {
        const error_object = {
          responseCode: 300,
          message: "Your Account No longer exists",
          response: "",
        };
        return error_object;
      }
      req.session.userID = rows[0].UserId;
      req.session.portalID = values[2];
      req.session.sessionid = values[3];
      const result_object = {
        responseCode: 200,
        message: "User logged In Successfully",
        response: {
          ...rows[0],
          isEmailVerified: undefined,
          IsDeleted: undefined,
        },
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Invalid Credentials",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

exports.userSignUpWithAuth = async (req, values) => {
  try {
    const { rows } = await query(queries.userSignUpWithAuth(), values);
    if (rows[0].Status == 0) {
      const { email, google_id, portal_id } = req.body;
      const values = [email.toLowerCase(), google_id, portal_id, req.sessionID, new Date(Date.now() + 86400000).toISOString()];
      const result = await this.userLoginWithAuth(req, values);
      const academic = this.userAnalysis([rows[0].UserId, false]);
      const pte = this.userAnalysis([rows[0].UserId, true]);
      query(queries.updateUserAnalysis(), [rows[0].UserId, academic, false]);
      query(queries.updateUserAnalysis(), [rows[0].UserId, pte, true]);
      return result;
    } else if (rows[0].Status == 1) {
      const { email, google_id, portal_id } = req.body;
      const values = [email.toLowerCase(), google_id, portal_id, req.sessionID, new Date(Date.now() + 86400000).toISOString()];
      const result = await this.userLoginWithAuth(req, values);
      return result;
    } else if (rows[0].Status == 2) {
      const { email, google_id, portal_id } = req.body;
      const values = [email.toLowerCase(), google_id, portal_id, req.sessionID, new Date(Date.now() + 86400000).toISOString()];
      const result = await this.userLoginWithAuth(req, values);
      return result;
    } else {
      return {
        responseCode: 500,
        message: "Registration Failed",
      };
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "user already exists",
        response: "",
      };

      return error_object;
    }
    console.log("error", error);
    return {
      responseCode: 500,
      message: "Something went wrong",
    };
  }
};

exports.userLoginWithAuth = async (req, values) => {
  try {
    const { rows } = await query(queries.userSignInWithAuth(), values);
    if (rows[0].Status == 0) {
      const error_object = {
        responseCode: 300,
        message: "User doesn't exist",
        response: "",
      };
      return error_object;
    } else if (rows[0].Status == 1) {
      req.session.userID = rows[0].UserId;
      req.session.portalID = values[2];
      req.session.sessionid = values[3];
      const result_object = {
        responseCode: 200,
        message: "user logged In Successfully",
        response: { ...rows[0], Status: undefined, IsDeleted: undefined },
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Invalid Credentials",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.verifyEmail = async (values) => {
  try {
    const tokenValidation = verifyAccountPasswordSetupTokenAccess(values);
    if (tokenValidation.responseCode === 2000) {
      const { rows } = await query(queries.verifyEmail(), [
        tokenValidation.response.email,
      ]);
      if (rows[0].verify_email) {
        return {
          responseCode: 200,
          message: "Email verified Successfully",
          response: "",
        };
      }
      return {
        responseCode: 500,
        message: "Something went wrong",
        response: tokenValidation.response,
      };
    } else {
      return tokenValidation;
    }
  } catch (error) {
    console.log(error.message);
    return {
      responseCode: 500,
      message: error.message,
    };
  }
};

module.exports.verifyPasswordtoken = async (values) => {
  try {
    const tokenValidation = verifyAccountPasswordResetTokenAccess(values);
    if (tokenValidation.responseCode === 2000) {
      const { rows } = await query(queries.changePassword(), [
        tokenValidation.response.email,
        values[1],
      ]);
      if (rows[0].reset_password) {
        return {
          responseCode: 200,
          message: "password Reset successfully",
          response: "",
        };
      }
      return {
        responseCode: 500,
        message: "Something went wrong",
        response: tokenValidation.response,
      };
    } else {
      return tokenValidation;
    }
  } catch (error) {
    console.log(error.message);
    return {
      responseCode: 500,
      message: error.message,
    };
  }
};

module.exports.userAnalysis = async (values) => {
  try {
    let updatedjsonobject, teststoremove;
    const { rows } = await query(queries.userAnalysis(), values);
    if (values[1] == true || values[1] == "true") {
      teststoremove = {
        Speaking: ["Re-tell Lecture"],
        Writing: ["Write Essay"],
        Listening: ["Highlight Correct Summary"],
      };
    } else {
      teststoremove = {
        Speaking: ["Respond to a Situation"],
        Writing: ["Write Email"],
      };
    }
    updatedjsonobject = removeTests(rows[0], teststoremove);
    query(queries.updateUserAnalysis(), [
      values[0],
      updatedjsonobject,
      values[1] == true || values[1] == "true" ? true : false,
    ]);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "User analysed successfully",
        response: updatedjsonobject,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while analysing User",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.userStoredAnalysis = async (values) => {
  try {
    const { rows } = await query(queries.userStoredAnalysis(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "User analysis",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while analysing User",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.averageScore = async (values) => {
  try {
    const { rows } = await query(queries.averageScore(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Average Score",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while getting Average Score",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.getExamDate = async (values) => {
  try {
    const { rows } = await query(queries.getExamDate(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Exam",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while getting Exam",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.checkTokens = async (values) => {
  try {
    const { rows } = await query(queries.checkTokens(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "User analysis",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while getting Exam",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.subtractTokens = async (values) => {
  try {
    const { rows } = await query(queries.subtractTokens(), values);
    if (rows[0].subtract_free_tokens) {
      const result_object = {
        responseCode: 200,
        message: "Tokens subtracted successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while subtracting tokens",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.userGoogleResponse = async (values) => {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${values[0]}`,
          Accept: "application/json",
        },
      }
    );
    return {
      responseCode: 200,
      message: "User Google Response",
      response: res.data,
    };
  } catch (error) {
    return {
      responseCode: 500,
      message: error.message,
    };
  }
}

module.exports.sessionDestroy = async (values) => {
  try {
    const { rows } = await query(queries.sessionDestroy(), values);
    if (rows[0].logout_user_by_admin) {
      return {
        responseCode: 200,
        message: "User logged out successfully",
        response: "",
      };
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
}

const removeTests = (data, testsToRemove) => {
  console.log(testsToRemove);
  const updateCategory = (categoryData, testNames) => {
    // Create a copy of the category data to avoid mutating the original object
    const updatedCategoryData = { ...categoryData };

    testNames.forEach((testName) => {
      if (updatedCategoryData.Tests[testName]) {
        // Extract the TotalCount and attemptedcount of the test to be removed
        const { TotalCount, attemptedcount } =
          updatedCategoryData.Tests[testName];

        // Update the total questions and attempted questions
        updatedCategoryData["Total Questions"] -= TotalCount;
        updatedCategoryData["Total Attempted Questions"] -= attemptedcount;

        // Remove the test from the Tests object
        delete updatedCategoryData.Tests[testName];
      }
    });

    return updatedCategoryData;
  };

  // Create a copy of the data to avoid mutating the original object
  const updatedData = { ...data };
  // Iterate over the testsToRemove object and update each category accordingly
  Object.keys(testsToRemove).forEach((category) => {
    if (updatedData.user_analysis[category]) {
      updatedData.user_analysis[category] = updateCategory(
        updatedData.user_analysis[category],
        testsToRemove[category]
      );
    }
  });

  return updatedData;
};

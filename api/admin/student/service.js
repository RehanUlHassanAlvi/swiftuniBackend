const queries = require("./queries");
const { query, initializeDeletedUsersArray } = require("../../../utils/db");
const {
  verifyAccountPasswordSetupTokenAccess,
  verifyAccountPasswordResetTokenAccess,
} = require("../../../middlewares/checkAccessToken");

module.exports.getAllStudent = async (values) => {
  try {
    const { rows } = await query(queries.getAllStudent(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "students:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no students available",
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

module.exports.getStudentData = async (values) => {
  try {
    const { rows } = await query(queries.getStudentData(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Student:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no student available",
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

module.exports.getStudent = async (values) => {
  try {
    const { rows } = await query(queries.getStudent(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "students:",
        response: rows.map((row) => {
          let LoggedOut = false;
          if (!row.SessionID) {
            LoggedOut = true;
          } else if (row.ExpiryTime && new Date(row.ExpiryTime) < new Date(new Date().toUTCString())) {
            LoggedOut = true;
          }
          return {
            ...row,
            LoggedOut
          };
        }),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no students available",
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

module.exports.getStudentFromTrash = async (values) => {
  try {
    const { rows } = await query(queries.getStudentFromTrash(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "students:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no students available",
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

module.exports.addStudent = async (values) => {
  try {
    const { rows } = await query(queries.addStudent(), values);
    if (rows[0].PortalName) {
      const error_object = {
        responseCode: 300,
        message: `User exists in portal ${rows[0].PortalName}`,
        response: "",
      };
      return error_object;
    }
    else if (Object.keys(rows).length > 0) {
      const academic = this.userAnalysis([rows[0].UserId, false]);
      const pte = this.userAnalysis([rows[0].UserId, true]);
      // query(queries.updateUserAnalysis(), [rows[0].UserId, academic, false]);
      // query(queries.updateUserAnalysis(), [rows[0].UserId, pte, true]);
      const result_object = {
        responseCode: 200,
        message: "User added successfully",
        userID: rows[0].UserId,
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

module.exports.updateStudent = async (values) => {
  try {
    const { rows } = await query(queries.updateStudent(), values);
    if (rows[0].Updated) {
      const result_object = {
        responseCode: 200,
        message: "Student updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message:
          "Something went wrong while updating Student or ID might not exists",
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

module.exports.deleteStudent = async (values) => {
  try {
    const { rows } = await query(queries.deleteStudent(), values);
    if (rows[0].block_student_by_admin) {
      initializeDeletedUsersArray();
      const result_object = {
        responseCode: 200,
        message: "Student Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Student",
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

module.exports.deleteStudentFromTrash = async (values) => {
  try {
    const { rows } = await query(queries.deleteStudentFromTrash(), values);
    if (rows[0].remove_student_from_trash_by_admin) {
      const result_object = {
        responseCode: 200,
        message: "Student Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Student",
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

module.exports.updateStudentBranch = async (values) => {
  try {
    const { rows } = await query(queries.updateStudentBranch(), values);
    if (rows[0].update_student_branch) {
      const result_object = {
        responseCode: 200,
        message: "Student branch updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating student branch",
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
} 

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

module.exports.logoutUserByAdmin = async (values) => {
  try {
    const { rows } = await query(queries.logoutUserByAdmin(), values); 
    console.log(rows[0].logout_user_by_admin);
    if (rows[0].logout_user_by_admin) {
      const result_object = {
        responseCode: 200,
        message: "User logged out successfully",
        response: "",
      };
      return result_object;
    }
    else{
      const result_object = {
        responseCode: 300,
        message: "Something went wrong while logging out User",
        response: "",
      };
      return result_object;
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

module.exports.getAttemptedMockTests = async (values) => {
  try {
    const { rows } = await query(queries.getAttemptedMockTests(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Attempted Mock Tests:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Attempted Mock Tests available",
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

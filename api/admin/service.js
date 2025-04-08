const { query } = require("../../utils/db");
const queries = require("./queries");

module.exports.addAdmin = async (values) => {
  try {
    const { rows } = await query(queries.addAdmin(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Admin added successfully",
        AdminId: rows[0].add_admin,
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Admin",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Admin already exists",
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

module.exports.addAdminInOther = async (values) => {
  try {
    const { rows } = await query(queries.addAdminInOther(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Admin added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Admin",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Admin already exists",
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

module.exports.updateAdmin = async (values) => {
  try {
    const { rows } = await query(queries.updateAdmin(), values);
    if (rows[0].update_admin) {
      const result_object = {
        responseCode: 200,
        message: "Admin updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message:
          "Something went wrong while updating Admin or ID might not exists",
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

module.exports.updateTransactionDetails = async (values) => {
  try {
    const { rows } = await query(queries.updateTransactionDetails(), values);
    if (rows[0].update_transaction_details_super_admin) {
      const result_object = {
        responseCode: 200,
        message: "Transaction Details updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message:
          "Something went wrong while updating Transaction Details or ID might not exists",
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

module.exports.getAdmin = async () => {
  try {
    const { rows } = await query(queries.getAdmin());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "admins:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no admins available",
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

module.exports.getTransactionDetails = async () => {
  try {
    const { rows } = await query(queries.getTransactionDetails());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Details:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Details available",
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

module.exports.adminDelete = async (values) => {
  try {
    if (values[0] == 1) {
      const error_object = {
        responseCode: 400,
        message: "Unable to delete super admin",
        response: "",
      };
      return error_object;
    }
    const { rows } = await query(queries.adminDelete(), values);
    if (rows[0].delete_admin) {
      const result_object = {
        responseCode: 200,
        message: "Admin Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting admin",
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

module.exports.loginAdmin = async (req, values) => {
  try {
    const { rows } = await query(queries.loginAdmin(), values);
    if (rows[0]) {
      req.session.adminID = rows[0].AdminId;
      req.session.portalID = rows[0].PortalId;
      req.session.role = rows[0].Role;
      const result_object = {
        responseCode: 200,
        message: "Admin logged In Successfully",
        response: rows[0],
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

module.exports.getPortalInfo = async (values) => {
  try {
    const { rows } = await query(queries.getPortalInfo(), values);
    console.log("Rows", values, rows);
    if (rows[0]) {
      const result_object = {
        responseCode: 200,
        message: "Portal Info",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 500,
        message: "Unable to fetch portal info. Try again later",
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

module.exports.getPortalInfoById = async (values) => {
  try {
    const { rows } = await query(queries.getPortalInfoById(), values);
    if (rows[0]) {
      const result_object = {
        responseCode: 200,
        message: "Portal Info",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 500,
        message: "Unable to fetch portal info. Try again later",
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

module.exports.updateAdminBranch = async (values) => {
  try { 
    const { rows } = await query(queries.updateAdminBranch(), values);
    if (rows[0].update_admin_branch) {
      const result_object = {
        responseCode: 200,
        message: "Admin branch updated successfully",
        response: rows[0],
      };
      return result_object;
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

module.exports.getExamDateOfUser = async (values) => {
  try {
    const { rows } = await query(queries.getExamDateOfUser(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Exam Date of User",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while getting Exam Date",
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

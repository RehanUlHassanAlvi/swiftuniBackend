const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getBranches = async () => {
  try {
    const { rows } = await query(queries.getBranches());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Branches:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Branches available",
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

module.exports.getBranchByBranchId = async (branch_id) => {
  try {
    const { rows } = await query(queries.getBranchByBranchId(), [branch_id]);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Branch:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Branch available",
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

module.exports.getBranchByPortalId = async (portal_id) => {
  try {
    const { rows } = await query(queries.getBranchByPortalId(), [portal_id]);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Branch:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Branch available",
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

module.exports.getBranchAccounts = async (branch_id) => {
  try {
    const { rows } = await query(queries.getBranchAccounts(), [branch_id]);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Branches:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Branches available",
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

module.exports.getBranchTransactions = async (values) => {
  try {
    const { rows } = await query(queries.getBranchTransactions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Branch Transactions:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Branch Transactions available",
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

module.exports.addBranches = async (values) => {
  try {
    const { rows } = await query(queries.addBranches(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Branch added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Branch",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Branch Name already exists",
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

module.exports.assignAccountsToBranches = async (values) => {
  try {
    console.log(values);
    const { rows } = await query(queries.assignAccountsToBranches(), values);
    console.log(rows[0]);
    if (rows[0].assign_revoke_accounts_to_branches === 1) {
      const result_object = {
        responseCode: 200,
        message: "Accounts assigned/revoked successfully",
        response: "",
      };
      return result_object;
    } else if (rows[0].assign_revoke_accounts_to_branches === 2) {
      const error_object = {
        responseCode: 300,
        message: "No accounts available to assign/revoke",
        response: "",
      };
      return error_object;
    } else if (rows[0].assign_revoke_accounts_to_branches === 3) {
      const error_object = {
        responseCode: 300,
        message: "You can't assign/revoke accounts to this branch",
        response: "",
      };
      return error_object;
    }
    else if (rows[0].assign_revoke_accounts_to_branches === 4) {
      const error_object = {
        responseCode: 300,
        message: "You can't revoke more accounts than assigned",
        response: "",
      };
      return error_object;
    }
    else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while assigning/revoking accounts",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Branch Name already exists",
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

module.exports.deleteBranches = async (values) => {
  try {
    const { rows } = await query(queries.deleteBranches(), values);
    if (rows[0].delete_branch) {
      const result_object = {
        responseCode: 200,
        message: "Branch Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Branch",
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

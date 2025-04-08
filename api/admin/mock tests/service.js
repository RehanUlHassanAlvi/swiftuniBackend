const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTests = async (values) => {
  try {
    const { rows } = await query(queries.getTests(),values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Mock Tests:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Mock Tests available",
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

module.exports.addTests = async (values) => {
  try {
    const { rows } = await query(queries.addTests(), values);
    if (rows[0].add_mock_test) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test added successfully",
        response: { mockTestId: rows[0].add_mock_test },
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Mock Test",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Mock Test Name already exists",
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

module.exports.updateTests = async (values) => {
  try {
    const { rows } = await query(queries.updateTests(), values);
    if (rows[0].update_mock_test) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Mock Test",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Test Name already exists",
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

module.exports.deleteTests = async (values) => {
  try {
    const { rows } = await query(queries.deleteTests(), values);
    if (rows[0].delete_mock_test) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Mock Test",
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

module.exports.updateOrderIdTests = async (values) => {
  try {
    const { rows } = await query(queries.updateOrderIdTests(), values);
    if (rows[0].update_order_id_tests) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test's Order ID updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Mock Test's Order ID",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Order ID already exists",
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

module.exports.lastAttemptedMockTestOfUsersOrganization = async (values) => {
  try {
    const { rows } = await query(queries.lastAttemptedMockTestOfUsersOrganization(), values);
    // Filter rows to only include entries with MockTestAttemptId
    const filteredRows = rows.filter(row => row.MockTestAttemptId !== null);
      
    if (filteredRows.length > 0) {  
      const result_object = {
        responseCode: 200,
        message: "Last Mock Tests",
        response: filteredRows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No Mock Test Found",
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


module.exports.getMockTestScore = async (values) => {
  try {
    const { rows } = await query(queries.getMockTestScore(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test Score:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Mock Test Score available",
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
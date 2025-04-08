const queries = require("./queries");
const { query } = require("../../../utils/db");
const utils = require("../../utils/utils");

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

module.exports.updateMockTestAttempt = async (values) => {
  try {
    console.log(values);
    const { rows } = await query(queries.updateMockTestAttempt(), values);
    console.log(rows);
    if (rows[0].update_mock_test_attempt) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test Attempted successfully:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong",
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

module.exports.deleteMockTestAttempt = async (values) => {
  try {
    const { rows } = await query(queries.deleteMockTestAttempt(), values);
    console.log(rows);
    if (rows[0].delete_mock_test_attempt) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test deleted successfully:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong",
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

module.exports.getMockTestAnalytics = async (values) => {
  try {
    const { rows } = await query(queries.getMockTestAnalytics(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Mock Test Analytics:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Mock Test Analytics available",
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

module.exports.deleteMockAttempted = async (values) => {
  try {
    const { rows } = await query(queries.deleteMockAttempted(), values);
    if (rows[0].delete_mock_attempted_development) {
      const result_object = {
        responseCode: 200,
        message: "Successfully deleted",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong",
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

const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getStrategyVideo = async (values) => {
  try {
    const { rows } = await query(queries.getStrategyVideo(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Strategy Videos:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Strategy Videos available",
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

module.exports.addStrategyVideo = async (values) => {
  try {
    const { rows } = await query(queries.addStrategyVideo(), values);

    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Strategy Video added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Strategy Video",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Template/Grammar already exists",
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

module.exports.updateStrategyVideo = async (values) => {
  try {
    const { rows } = await query(queries.updateStrategyVideo(), values);
    if (rows[0].update_strategy_video) {
      const result_object = {
        responseCode: 200,
        message: "Strategy Video updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Strategy Video",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Template/Grammar already exists",
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

module.exports.deleteStrategyVideo = async (values) => {
  try {
    const { rows } = await query(queries.deleteStrategyVideo(), values);
    if (rows[0].delete_strategy_video) {
      const result_object = {
        responseCode: 200,
        message: "Strategy Video Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Strategy Video",
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

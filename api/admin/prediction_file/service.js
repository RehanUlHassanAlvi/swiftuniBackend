const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getPredictionFile = async (values) => {
  try {
    const { rows } = await query(queries.getPredictionFile(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Prediction Files:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Prediction Files available",
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

module.exports.addPredictionFile = async (values) => {
  try {
    console.log("here");
    const { rows } = await query(queries.addPredictionFile(), values);

    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Prediction File added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Prediction File",
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

module.exports.updatePredictionFile = async (values) => {
  try {
    const { rows } = await query(queries.updatePredictionFile(), values);
    if (rows[0].update_prediction_file) {
      const result_object = {
        responseCode: 200,
        message: "Prediction File updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Prediction File",
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

module.exports.deletePredictionFile = async (values) => {
  try {
    const { rows } = await query(queries.deletePredictionFile(), values);
    if (rows[0].delete_prediction_file) {
      const result_object = {
        responseCode: 200,
        message: "Prediction File Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Prediction File",
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

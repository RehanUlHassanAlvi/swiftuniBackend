const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getHelpCenters = async () => {
  try {
    const { rows } = await query(queries.getHelpCenters());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Help Centers:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Help Centers available",
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

module.exports.addHelpCenter = async (values) => {
  try {
    const { rows } = await query(queries.addHelpCenter(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Help Center added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Help Center",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Help Center Name already exists",
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

module.exports.deleteHelpCenter = async (values) => {
  try {
    const { rows } = await query(queries.deleteHelpCenter(), values);
    if (rows[0].delete_help_center) {
      const result_object = {
        responseCode: 200,
        message: "Help Center Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Help Center",
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

module.exports.updateHelpCenter = async (values) => {
  try {
    const { rows } = await query(queries.updateHelpCenter(), values);
    if (rows[0].update_help_center) {
      const result_object = {
        responseCode: 200,
        message: "Help Center Updated Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Help Center",
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


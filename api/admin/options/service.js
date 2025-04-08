const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getOption = async () => {
  try {
    const { rows } = await query(queries.getOption());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Options:",
        response: rows.map((row) => ({
          ...row,
          OptionNames: JSON.parse(row.OptionNames),
          AnswerNames: JSON.parse(row.AnswerNames),
        })),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Options available",
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

module.exports.addOption = async (values) => {
  try {
    const { rows } = await query(queries.addOption(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Option added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Option",
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
    if (error.code == 23503) {
      const error_object = {
        responseCode: 500,
        message: "Question should exist if you want to add its options",
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

module.exports.updateOption = async (values) => {
  try {
    const { rows } = await query(queries.updateOption(), values);
    if (rows[0].update_option) {
      const result_object = {
        responseCode: 200,
        message: "Option updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Option",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Option already exists",
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

module.exports.deleteOption = async (values) => {
  try {
    const { rows } = await query(queries.deleteOption(), values);
    if (rows[0].delete_option) {
      const result_object = {
        responseCode: 200,
        message: "Option Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Option",
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

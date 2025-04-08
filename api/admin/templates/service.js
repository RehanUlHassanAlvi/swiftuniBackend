const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTemplate = async (values) => {
  try {
    const { rows } = await query(queries.getTemplate(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Templates:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Templates available",
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

module.exports.getGrammerTemplate = async (values) => {
  try {
    const { rows } = await query(queries.getGrammerTemplate(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Grammars:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Grammars available",
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

module.exports.addTemplate = async (values) => {
  try {
    console.log("here")
    const { rows } = await query(queries.addTemplate(), values);

    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Template/Grammar added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Template/Grammar",
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

module.exports.updateTemplate = async (values) => {
  try {
    const { rows } = await query(queries.updateTemplate(), values);
    if (rows[0].update_template) {
      const result_object = {
        responseCode: 200,
        message: "Template/Grammar updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Template/Grammar",
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

module.exports.deleteTemplate = async (values) => {
  try {
    const { rows } = await query(queries.deleteTemplate(), values);
    if (rows[0].delete_template) {
      const result_object = {
        responseCode: 200,
        message: "Template Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Template",
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

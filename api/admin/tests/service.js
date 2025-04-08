const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTests = async () => {
  try {
    const { rows } = await query(queries.getTests());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Tests:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Tests available",
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

module.exports.getCategorizedTests = async () => {
  try {
    const { rows } = await query(queries.getCategorizedTests());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Categories:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Categories available",
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
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Test added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Test",
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

module.exports.updateTests = async (values) => {
  try {
    const { rows } = await query(queries.updateTests(), values);
    if (rows[0].update_test) {
      const result_object = {
        responseCode: 200,
        message: "Test updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Test",
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
    if (rows[0].delete_test) {
      const result_object = {
        responseCode: 200,
        message: "Test Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Test",
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
        message: "Test's Order ID updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Test's Order ID",
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

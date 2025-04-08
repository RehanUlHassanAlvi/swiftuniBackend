const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTestCategories = async () => {
  try {
    const { rows } = await query(queries.getTestCategories());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test Categories retrieved successfully",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no IELTS Test Categories available",
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

module.exports.addTestCategories = async (category_name, order_id, organization_id) => {
  try {
    const values = [category_name, order_id, organization_id];
    const { rows } = await query(queries.addTestCategories(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test Category added successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to add IELTS Test Category",
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

module.exports.updateTestCategories = async (id, category_name, order_id, organization_id) => {
  try {
    const values = [id, category_name, order_id, organization_id];
    const { rows } = await query(queries.updateTestCategories(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test Category updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to update IELTS Test Category",
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

module.exports.deleteTestCategories = async (id, organization_id) => {
  try {
    const values = [id, organization_id];
    const { rows } = await query(queries.deleteTestCategories(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test Category deleted successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to delete IELTS Test Category",
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
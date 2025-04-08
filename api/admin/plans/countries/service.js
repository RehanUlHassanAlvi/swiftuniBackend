const queries = require("./queries");
const { query } = require("../../../../utils/db");

module.exports.getCountries = async () => {
  try {
    const { rows } = await query(queries.getCountries());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Countries:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Countries available",
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

module.exports.addCountry = async (values) => {
  try {
    const { rows } = await query(queries.addCountry(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Country added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Country",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Country Name already exists",
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

module.exports.updateCountry = async (values) => {
  try {
    const { rows } = await query(queries.updateCountry(), values);
    if (rows[0].update_country) {
      const result_object = {
        responseCode: 200,
        message: "Country Updated Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Country",
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

module.exports.approveCountry = async (values) => {
  try {
    const { rows } = await query(queries.approveCountry(), values);
    if (rows[0].approve_country) {
      const result_object = {
        responseCode: 200,
        message: "Country Approved Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while approving Country",
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
}

module.exports.getPlanOfCountry = async (values) => {
  try {
    const { rows } = await query(queries.getPlanOfCountry(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Plans of Country:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Countries available",
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

module.exports.updatePlanPriceOfCountry = async (values) => {
  try {
    const { rows } = await query(queries.updatePlanPriceOfCountry(), values);
    if (rows[0].update_price_in_bridge) {
      const result_object = {
        responseCode: 200,
        message: "Plan Price Updated Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Plan Price",
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

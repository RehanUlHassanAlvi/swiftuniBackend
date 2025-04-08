const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getAllPromoCode = async () => {
  try {
    const { rows } = await query(queries.getAllPromoCode());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Promo Codes:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Promo Codes available",
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

module.exports.getPromoCodeById = async (values) => {
  try {
    const { rows } = await query(queries.getPromoCodeById(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Promo Code:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There is currently no Promo Code available",
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

module.exports.getPromoCodeUsage = async (values) => {
  try {
    const { rows } = await query(queries.getPromoCodeUsage(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Promo Code Usage:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while fetching Promo Code Usage",
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

module.exports.getPromoCodeForWhitelabelById = async (values) => {
  try {
    const { rows } = await query(
      queries.getPromoCodeForWhitelabelById(),
      values
    );
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Promo Code:",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There is currently no Promo Code available",
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

module.exports.addPromoCode = async (values) => {
  try {
    const { rows } = await query(queries.addPromoCode(), values);
    console.log(rows);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "PromoCode added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding PromoCode",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "PromoCode already exists",
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

module.exports.reactivatePromoCode = async (values) => {
  try {
    const { rows } = await query(queries.reactivatePromoCode(), values);
    console.log(rows);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "PromoCode updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating PromoCode",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "PromoCode already exists",
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

module.exports.updatePromoCodeStatus = async (values) => {
  try {
    const { rows } = await query(queries.updatePromoCodeStatus(), values);
    if (rows[0].toggle_promo_code_status) {
      const result_object = {
        responseCode: 200,
        message: "Promo Code updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Promo Code",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Promo Code already exists",
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

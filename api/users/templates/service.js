const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTemplate = async (values) => {
  try {
    const { rows } = await query(queries.getTemplate(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Templates:",
        response: rows.map((row) => {
          const { UpdatedAt, CreatedAt, TemplateId, ...rest } = row;
          return rest;
        }),
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
        response: rows.map((row) => {
          const { UpdatedAt, CreatedAt, TemplateId, ...rest } = row;
          return rest;
        }),
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

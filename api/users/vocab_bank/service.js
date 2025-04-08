const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getVocabBank = async (values) => {
  try {
    const { rows } = await query(queries.getVocabBank(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Vocabs:",
        response: rows.map((row) => ({
          ...row,
          CreatedAt: undefined,
          UpdatedAt: undefined,
        })),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Vocabs available",
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

module.exports.addVocabBank = async (values) => {
  try {
    const { rows } = await query(queries.addVocabBank(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Vocab added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Vocab",
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
        message: "Question should exist if you want to add its Vocabs",
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

module.exports.updateVocabBank = async (values) => {
  try {
    const { rows } = await query(queries.updateVocabBank(), values);
    if (rows[0].update_vocab) {
      const result_object = {
        responseCode: 200,
        message: "Vocab updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Vocab",
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

module.exports.deleteVocabBank = async (values) => {
  try {
    const { rows } = await query(queries.deleteVocabBank(), values);
    if (rows[0].delete_vocab) {
      const result_object = {
        responseCode: 200,
        message: "Vocab Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Vocab",
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

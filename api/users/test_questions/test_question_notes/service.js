const queries = require("./queries");
const { query } = require("../../../../utils/db");
const utils = require("../../../utils/utils");

module.exports.addOrEditTestQuestionNotes = async (values) => {
  try {
    const { rows } = await query(queries.addOrEditTestQuestionNotes(), values);
    if (Object.keys(rows).length > 0) {
      let result_object;
      if (rows[0].add_edit_test_question_note === 1) {
        result_object = {
          responseCode: 200,
          message: "Question note updated successfully!!!",
          response: "",
        };
      } else if (rows[0].add_edit_test_question_note === -1) {
        result_object = {
          responseCode: 200,
          message: "Question note added successfully!!!",
          response: "",
        };
      } else {
        result_object = {
          responseCode: 500,
          message: "Unable to add or edit note",
          response: "",
        };
      }

      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Test Categories available",
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

module.exports.getTestQuestionNoteOfUser = async (values) => {
  try {
    const { rows } = await query(queries.getTestQuestionNoteOfUser(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Note",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "No Note Exists",
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

module.exports.deleteTestQuestionNoteOfUser = async (values) => {
  try {
    const { rows } = await query(
      queries.deleteTestQuestionNoteOfUser(),
      values
    );
    if (rows[0].delete_test_question_note_of_user) {
      const result_object = {
        responseCode: 200,
        message: "Note deleted successsfully!!!",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Unable to delete Note.",
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

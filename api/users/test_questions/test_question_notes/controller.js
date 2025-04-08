const service = require("./service");

module.exports.addOrEditTestQuestionNotes = async (req, res, next) => {
  try {
    const { test_question_id, note } = req.body;

    const values = [test_question_id, req.session.userID, note];

    const result = await service.addOrEditTestQuestionNotes(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.getTestQuestionNoteOfUser = async (req, res, next) => {
  try {
    const { test_question_id } = req.query;

    const values = [test_question_id, req.session.userID];
    console.log("Values" , values)
    const result = await service.getTestQuestionNoteOfUser(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.deleteTestQuestionNoteOfUser = async (req, res, next) => {
  try {
    const { note_id } = req.query;

    const values = [note_id];

    const result = await service.deleteTestQuestionNoteOfUser(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

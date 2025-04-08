const service = require("./service");

module.exports.addAppearedQuestions = async (req, res, next) => {
  try {
    const { question_id, exam_date, exam_vanue, exam_memory } = req.body;

    const values = [
      question_id,
      exam_date,
      exam_vanue,
      exam_memory,
      req.session.userID,
    ];

    const result = await service.addAppearedQuestions(values);
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

module.exports.getAppearedQuestionsOfUser = async (req, res, next) => {
  try {
    const { question_id } = req.query;

    const values = [question_id, req.session.userID];
    console.log(values)
    const result = await service.getAppearedQuestionsOfUser(values);
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

module.exports.deleteAppearedQuestions = async (req, res, next) => {
  try {
    const { appeared_question_id } = req.query;

    const values = [appeared_question_id, req.session.userID];

    const result = await service.deleteAppearedQuestions(values);
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

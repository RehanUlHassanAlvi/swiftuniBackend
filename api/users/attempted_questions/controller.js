const service = require("./service");

module.exports.getAttemptedQuestionsByQuestionId = async (req, res, next) => {
  try {
    const { question_id, page = 1, page_size = 4, is_ptecore } = req.query;

    const offset = (page - 1) * page_size;

    const values = [
      question_id,
      req.session.userID,
      page_size,
      offset,
      is_ptecore,
    ];

    const result = await service.getAttemptedQuestionsByQuestionId(values);
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

module.exports.getAttemptedQuestionsOfOthersByQuestionId = async (
  req,
  res,
  next
) => {
  try {
    const { question_id, page = 1, page_size = 4, is_ptecore } = req.query;

    const offset = (page - 1) * page_size;

    const values = [
      question_id,
      req.session.userID,
      page_size,
      offset,
      is_ptecore,
    ];
    const result = await service.getAttemptedQuestionsOfOthersByQuestionId(
      values
    );
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

module.exports.addAttemptedQuestions = async (req, res, next) => {
  try {
    const {
      test_question_id,
      marks_obtained,
      user_response,
      time_taken,
      is_ptecore,
    } = req.body;

    const values = [
      test_question_id,
      req.session.userID,
      marks_obtained,
      JSON.stringify(user_response),
      time_taken,
      is_ptecore,
    ];
    const result = await service.addAttemptedQuestions(values);
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

module.exports.getTestQuestionsWithOptions = async (req, res, next) => {
  try {
    const { question_id } = req.query;
    const values = [question_id];
    const result = await service.getTestQuestionsWithOptions(values);
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

module.exports.deleteAttemptedQuestions = async (req, res, next) => {
  try {
    const { attempted_question_id } = req.query;
    const values = [attempted_question_id];
    const result = await service.deleteAttemptedQuestions(values);
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

module.exports.addCommentLike = async (req, res, next) => {
  try {
    const { attempted_question_id } = req.query;
    const values = [req.session.userID, attempted_question_id];
    const result = await service.addCommentLike(values);
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

module.exports.deleteCommentLike = async (req, res, next) => {
  try {
    const { attempted_question_id } = req.query;
    const values = [req.session.userID, attempted_question_id];
    const result = await service.deleteCommentLike(values);
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

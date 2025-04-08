const service = require("./service");

module.exports.addAttemptedQuestions = async (req, res, next) => {
  try {
    const {
      mock_test_question_id,
      marks_obtained,
      user_response,
      time_taken,
      is_ptecore,
      mock_test_attempt_id,
      all_times,
      audio_url,
    } = req.body;

    const values = [
      mock_test_question_id,
      req.session.userID,
      marks_obtained,
      JSON.stringify(user_response),
      time_taken,
      is_ptecore,
      mock_test_attempt_id,
      all_times,
      audio_url,
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

module.exports.addTimeoutAttemptedQuestions = async (req, res, next) => {
  try {
    const { mock_test_attempt_id, is_ptecore, response_obj } = req.body;

    const values = [
      mock_test_attempt_id,
      req.session.userID,
      is_ptecore,
      response_obj,
    ];
    const result = await service.addTimeoutAttemptedQuestions(values);
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
    const { mock_test_id } = req.query;
    const values = [mock_test_id, req.session.userID];
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

module.exports.getSignedURL = async (req, res, next) => {
  try {
    const result = await service.getSignedURL();
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

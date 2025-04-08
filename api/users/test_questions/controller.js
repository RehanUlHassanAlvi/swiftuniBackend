const service = require("./service");

module.exports.getTestQuestions = async (req, res, next) => {
  try {
    const { test_id, page = 1, page_size = 8, search_name } = req.query;

    const offset = (page - 1) * page_size;

    const values = [
      test_id,
      page_size,
      offset,
      req.session.userID,
      search_name,
    ];
    const result = await service.getTestQuestions(values);
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

module.exports.getTestQuestionsByName = async (req, res, next) => {
  try {
    const {
      test_name,
      page = 1,
      page_size = 8,
      is_ptecore = false,
      search_name,
      order_by,
      high_frequency,
      bookmarked,
      is_practiced,
      easy,
      prediction,
      difficulty_level,
    } = req.query;

    const offset = (page - 1) * page_size;

    const values = [
      test_name,
      page_size,
      offset,
      req.session.userID,
      is_ptecore,
      search_name,
      order_by,
      high_frequency,
      bookmarked,
      is_practiced,
      easy,
      prediction,
      difficulty_level,
    ];
    const result = await service.getTestQuestionsByName(values);
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

module.exports.dashboardSearch = async (req, res, next) => {
  try {
    const {
      test_name,
      page = 1,
      page_size = 8,
      search_text,
    } = req.query;

    const offset = (page - 1) * page_size;

    const values = [
      test_name,
      page_size,
      offset,
      req.session.userID,
      search_text,
    ];
    const result = await service.dashboardSearch(values);
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
    const { question_id, test_question_id } = req.query;
    const values = [question_id, req.session.userID, test_question_id];
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

module.exports.resetAttemptedTestQuestions = async (req, res, next) => {
  try {
    const user_id = req.session.userID;
    const { test_name } = req.query;
    const values = [user_id, test_name];
    const result = await service.resetAttemptedTestQuestions(values);

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

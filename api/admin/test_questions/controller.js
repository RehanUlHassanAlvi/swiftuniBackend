const service = require("./service");

module.exports.getTestQuestions = async (req, res, next) => {
  try {
    const { test_id, page = 1, page_size = 10 } = req.query;

    const offset = (page - 1) * page_size;

    const values = [test_id, page_size, offset];
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

module.exports.addAndUpdateTestQuestions = async (req, res, next) => {
  try {
    const { test_id, question_ids } = req.body;

    const values = [test_id, question_ids];

    const result = await service.addAndUpdateTestQuestions(values);
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

module.exports.deleteTestQuestions = async (req, res, next) => {
  try {
    const { test_id } = req.query;

    const values = [test_id];

    const result = await service.deleteTestQuestions(values);
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

module.exports.updateOrderIdTestQuestions = async (req, res, next) => {
  try {
    const { current_row_id, swap_row_id } = req.body;

    const values = [current_row_id, swap_row_id];

    const result = await service.updateOrderIdTestQuestions(values);
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
      page_size = 10,
      is_ptecore,
      search_name,
      order_by,
      high_frequency,
      easy
    } = req.query;

    const offset = (page - 1) * page_size;

    const values = [
      test_name,
      page_size,
      offset,
      is_ptecore,
      search_name,
      order_by,
      high_frequency,
      easy
    ];
    console.log("VALIES" , values)
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

module.exports.getTestQuestionsWithOptions = async (req, res, next) => {
  try {
    const { question_id, test_question_id } = req.query;
    const values = [question_id, test_question_id];
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

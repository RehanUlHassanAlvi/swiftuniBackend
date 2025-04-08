const Joi = require("joi");

module.exports.addAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAdminInOtherValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    portal_id: Joi.number().required(),
    permissions: Joi.array().items(Joi.string()).required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    admin_id: Joi.number().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().optional(),
    permissions: Joi.array().items(Joi.string()).required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.adminDeleteValidate = (req, res, next) => {
  const schema = Joi.object({
    admin_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.loginAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    // portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addTestCategoriesValidate = (req, res, next) => {
  const schema = Joi.object({
    category_name: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateTestCategoriesValidate = (req, res, next) => {
  const schema = Joi.object({
    test_category_id: Joi.number().required(),
    category_name: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateOrderIdTestCategoriesValidate = (req, res, next) => {
  const schema = Joi.object({
    current_row_id: Joi.number().required(),
    swap_row_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteTestCategoriesValidate = (req, res, next) => {
  const schema = Joi.object({
    test_category_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_category_id: Joi.number().required(),
    test_name: Joi.string().required(),
    is_answer_fixed: Joi.boolean().required(),
    beginning_time: Joi.number().optional().default(null),
    total_time: Joi.number().optional().default(null),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addMockTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_name: Joi.string().required(),
    mock_test_total_time: Joi.number().optional().default(null),
    core: Joi.boolean().required(),
    mock_test_type_id: Joi.number().optional().default(null),
    individual_times: Joi.string().optional().default(null),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().required(),
    test_category_id: Joi.number().required(),
    test_name: Joi.string().required(),
    is_answer_fixed: Joi.boolean().required(),
    beginning_time: Joi.number().optional().default(null),
    total_time: Joi.number().optional().default(null),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateMockTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_id: Joi.number().required(),
    mock_test_name: Joi.string().required(),
    mock_test_total_time: Joi.number().optional().default(null),
    core: Joi.boolean().required(),
    individual_times: Joi.string().optional().default(null),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateOrderIdTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    current_row_id: Joi.number().required(),
    swap_row_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteMockTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addQuestionValidate = (req, res, next) => {
  const schema = Joi.object({
    question_name: Joi.string().required(),
    question_statement: Joi.string().optional(),
    total_marks: Joi.number().required(),
    audio_objects: Joi.array().items(Joi.any()).optional(),
    major_aspects: Joi.array()
      .items(
        Joi.alternatives().try(
          Joi.string(), // For 1D array (array of strings)
          Joi.array().items(Joi.string()) // For 2D array (array of arrays of strings)
        )
      )
      .optional(),
    minor_aspects: Joi.array()
      .items(
        Joi.alternatives().try(
          Joi.string(), // For 1D array (array of strings)
          Joi.array().items(Joi.string()) // For 2D array (array of arrays of strings)
        )
      )
      .optional(),
    test_id: Joi.number().required(),
    question_image: Joi.string().optional(),
    prediction: Joi.boolean().required(),
    difficulty_level: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateQuestionValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    question_name: Joi.string().required(),
    question_statement: Joi.string().optional(),
    total_marks: Joi.number().required(),
    audio_objects: Joi.array().items(Joi.any()).optional(),
    major_aspects: Joi.array()
      .items(
        Joi.alternatives().try(
          Joi.string(), // For 1D array (array of strings)
          Joi.array().items(Joi.string()) // For 2D array (array of arrays of strings)
        )
      )
      .optional(),
    minor_aspects: Joi.array()
      .items(
        Joi.alternatives().try(
          Joi.string(), // For 1D array (array of strings)
          Joi.array().items(Joi.string()) // For 2D array (array of arrays of strings)
        )
      )
      .optional(),
    test_id: Joi.number().required(),
    question_image: Joi.string().optional(),
    prediction: Joi.boolean().required(),
    difficulty_level: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateQuestionPredictionValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteQuestionValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addOptionValidate = (req, res, next) => {
  const schema = Joi.object({
    options_names: Joi.array().items(Joi.any()).optional(),
    answer_names: Joi.array().items(Joi.string()).required(),
    question_id: Joi.number().required(),
    option_text: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateOptionValidate = (req, res, next) => {
  const schema = Joi.object({
    option_id: Joi.number().required(),
    options_names: Joi.any().optional(),
    answer_names: Joi.array().items(Joi.string()).required(),
    question_id: Joi.number().required(),
    option_text: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteOptionValidate = (req, res, next) => {
  const schema = Joi.object({
    option_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().required(),
    page: Joi.number().required(),
    page_size: Joi.number().optional(),
    search_name: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPendingMockTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_attempted_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getTestQuestionsByNameValidate = (req, res, next) => {
  const schema = Joi.object({
    test_name: Joi.string().required(),
    page: Joi.number().required(),
    page_size: Joi.number().optional(),
    is_ptecore: Joi.boolean().optional(),
    search_name: Joi.string().optional(),
    order_by: Joi.string().optional(),
    high_frequency: Joi.boolean().optional(),
    bookmarked: Joi.boolean().optional(),
    is_practiced: Joi.string()
      .valid(null, "practiced", "not-practiced")
      .optional(),
    easy: Joi.boolean().optional(),
    prediction: Joi.boolean().optional(),
    difficulty_level: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.dashboardSearchValidate = (req, res, next) => {
  const schema = Joi.object({
    test_name: Joi.string().required(),
    page: Joi.number().required(),
    page_size: Joi.number().optional(),
    search_text: Joi.string().allow(null, '').optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getTestQuestionsByNameAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    test_name: Joi.string().required(),
    page: Joi.number().required(),
    page_size: Joi.number().optional(),
    is_ptecore: Joi.boolean().optional(),
    search_name: Joi.string().optional(),
    order_by: Joi.string().optional(),
    high_frequency: Joi.boolean().optional(),
    easy: Joi.boolean().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getTestQuestionsWithOptionsValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    test_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockTestQuestionsWithOptionsValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAndUpdateTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().required(),
    question_ids: Joi.array().items(Joi.number()).required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAndUpdateMockTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_id: Joi.number().required(),
    question_ids: Joi.array().items(Joi.number()).required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteMockTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateOrderIdTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    current_row_id: Joi.number().required(),
    swap_row_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.resendEmailVerificationValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addUserValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    countrycode: Joi.string().required(),
    phonenumber: Joi.string().required(),
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateUserValidate = (req, res, next) => {
  const schema = Joi.object({
    countrycode: Joi.string().required(),
    phonenumber: Joi.string().required(),
    name: Joi.string().required(),
    city: Joi.string().optional(),
    img: Joi.any().optional(),
    pre_img_url: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.UserDeletebyUserValidate = (req, res, next) => {
  const schema = Joi.object({
    is_deleted: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.permanentlyDeleteUserValidate = (req, res, next) => {
  const schema = Joi.object({
    user_Id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.loginUserValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.countryCodeValidate = (req, res, next) => {
  const schema = Joi.object({
    country_code: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

exports.loginWithAuthValidate = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    auth_id: Joi.string().required(),
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

exports.signUpWithAuthValidate = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    google_id: Joi.string().required(),
    name: Joi.string().required(),
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.verifyEmailValidate = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.passwordResetValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.verifyPasswordtokenValidate = (req, res, next) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAttemptedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_question_id: Joi.number().required(),
    marks_obtained: Joi.number().required(),
    user_response: Joi.any().required(),
    time_taken: Joi.number().required(),
    is_ptecore: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getAttemptedQuestionsByQuestionIdValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    is_ptecore: Joi.boolean().required(),
    page: Joi.number().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteAttemptedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    attempted_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addOrEditTestQuestionNotesValidate = (req, res, next) => {
  const schema = Joi.object({
    test_question_id: Joi.number().required(),
    note: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addBookmarkValidate = (req, res, next) => {
  const schema = Joi.object({
    test_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteBookmarkValidate = (req, res, next) => {
  const schema = Joi.object({
    bookmark_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getTestQuestionNoteOfUserValidate = (req, res, next) => {
  const schema = Joi.object({
    test_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteTestQuestionNoteOfUserValidate = (req, res, next) => {
  const schema = Joi.object({
    note_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAppearedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    exam_date: Joi.string().required(),
    exam_vanue: Joi.string().optional(),
    exam_memory: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteAppearedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    appeared_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getAppearedQuestionsOfUserValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addTemplateValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    pdf: Joi.any().optional(),
    is_template: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateTemplateValidate = (req, res, next) => {
  const schema = Joi.object({
    template_id: Joi.number().required(),
    name: Joi.string().required(),
    pdf: Joi.any().optional(),
    pre_pdf_url: Joi.string().required(),
    is_template: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteTemplateValidate = (req, res, next) => {
  const schema = Joi.object({
    template_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getTemplateValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.userAnalysisValidate = (req, res, next) => {
  const schema = Joi.object({
    is_ptecore: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addMockAttemptedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_question_id: Joi.number().required(),
    marks_obtained: Joi.number().required(),
    user_response: Joi.any().required(),
    time_taken: Joi.number().required(),
    is_ptecore: Joi.boolean().required(),
    mock_test_attempt_id: Joi.number().required(),
    all_times: Joi.string().required(),
    audio_url: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockAttemptedQuestionsByQuestionIdValidate = (
  req,
  res,
  next
) => {
  const schema = Joi.object({
    mock_question_id: Joi.number().required(),
    page: Joi.number().optional(),
    is_ptecore: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteMockAttemptedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateMockTestAttemptValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_attempt_id: Joi.number().required(),
    end_time: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addVocabBankValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("known", "unknown").optional(),
    description: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateVocabBankValidate = (req, res, next) => {
  const schema = Joi.object({
    vocab_bank_id: Joi.number().required(),
    type: Joi.string().valid("known", "unknown").optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteVocabBankValidate = (req, res, next) => {
  const schema = Joi.object({
    vocab_bank_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockTestAnalyticsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_attempted_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockTestAnalyticsForAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    mock_test_attempted_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateExamDateValidate = (req, res, next) => {
  const schema = Joi.object({
    exam_date: Joi.string().required(),
    exam_target: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addMockTimeoutAttemptedQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_attempt_id: Joi.number().required(),
    is_ptecore: Joi.boolean().optional(),
    response_obj: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getCommentValidate = (req, res, next) => {
  const schema = Joi.object({
    test_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addCommentValidate = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
    comment_img: Joi.any().optional(),
    category: Joi.string().optional(),
    test_question_id: Joi.number().required(),
    parent_id: Joi.number().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteCommentValidate = (req, res, next) => {
  const schema = Joi.object({
    comment_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.commentLikeValidate = (req, res, next) => {
  const schema = Joi.object({
    comment_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAttemptedQuestionCommentValidate = (req, res, next) => {
  const schema = Joi.object({
    attempted_questions_comment: Joi.string().required(),
    attempted_question_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addAttemptedQuestionCommentLikeValidate = (req, res, next) => {
  const schema = Joi.object({
    attempted_questions_comment_id: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.AttemptedQuestionLikeDislikeValidate = (req, res, next) => {
  const schema = Joi.object({
    attempted_question_id: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockTestUserValidate = (req, res, next) => {
  const schema = Joi.object({
    core: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
    mock_test_type_id: Joi.number().optional().default(null),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getMockTestUserAttemptedCountValidate = (req, res, next) => {
  const schema = Joi.object({
    core: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addPortalValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_name: Joi.string().required(),
    portal_owner_name: Joi.string().required(),
    location: Joi.string().required(),
    country_id: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updatePortalValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
    portal_link: Joi.string().required(),
    portal_owner_name: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updatePortalConfigurationValidate = (req, res, next) => {
  const schema = Joi.object({
    strategy_video_visible: Joi.boolean().required(),
    template_visible: Joi.boolean().required(),
    grammar_visible: Joi.boolean().required(),
    self_strategy_video_visible: Joi.boolean().required(),
    self_template_visible: Joi.boolean().required(),
    self_grammar_visible: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updatePortalInfoValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
    facebook_link: Joi.string().required(),
    whatsapp_link: Joi.string().required(),
    telegram_link: Joi.string().required(),
    phoneno: Joi.string().required(),
    support_email: Joi.string().required(),
    support_address: Joi.string().required(),
    portal_logo_url: Joi.string().optional(),
    favicon_url: Joi.string().optional(),
    landing_img_url: Joi.string().optional(),
    youtube_link: Joi.string().optional(),
    youtube_thumbnail: Joi.string().optional(),
    portal_info: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deletePortalValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPortalInfoValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_url: Joi.string().required(),
    is_admin: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPortalInfoByIdValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPredictionFileValidate = (req, res, next) => {
  const schema = Joi.object({
    core: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addPredictionFileValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    pdf: Joi.any().optional(),
    priority: Joi.number().required(),
    core: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updatePredictionFileValidate = (req, res, next) => {
  const schema = Joi.object({
    file_id: Joi.number().required(),
    name: Joi.string().required(),
    pdf: Joi.any().optional(),
    pre_file_url: Joi.string().required(),
    priority: Joi.number().required(),
    core: Joi.boolean().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deletePredictionFileValidate = (req, res, next) => {
  const schema = Joi.object({
    file_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getStrategyVideoForAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    core: Joi.string().required(),
    portal_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getStrategyVideoValidate = (req, res, next) => {
  const schema = Joi.object({
    core: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addStrategyVideoValidate = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    yt_link: Joi.string().required(),
    category: Joi.string().required(),
    priority: Joi.number().required(),
    language: Joi.string().required(),
    core: Joi.boolean().required(),
    thumbnail: Joi.any().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateStrategyVideoValidate = (req, res, next) => {
  const schema = Joi.object({
    video_id: Joi.number().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    yt_link: Joi.string().required(),
    category: Joi.string().required(),
    priority: Joi.string().required(),
    language: Joi.string().required(),
    core: Joi.boolean().required(),
    thumbnail: Joi.any().optional(),
    pre_file_url: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteStrategyVideoValidate = (req, res, next) => {
  const schema = Joi.object({
    video_id: Joi.number().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPortalInfoForUsersValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_url: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addStudentValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    portal_id: Joi.number().required(),
    type: Joi.string().required(),
    target: Joi.string().required(),
    note: Joi.string().optional(),
    image_of_user: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateStudentValidate = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.number().required(),
    name: Joi.string().required(),
    pre_img_url: Joi.string().optional(),
    image_of_user: Joi.string().optional(),
    password: Joi.string().optional(),
    type: Joi.string().required(),
    target: Joi.string().required(),
    note: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteStudentValidate = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getStudentValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
    name: Joi.string().optional(),
    subscribed: Joi.boolean().optional(),
    type: Joi.string().optional(),
    branch_name: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getStudentDataValidate = (req, res, next) => {
  const schema = Joi.object({
    student_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPortalAdminsValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
    branch_name: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addSubscriptionValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price_in_pkr: Joi.number().required(),
    days: Joi.number().required(),
    discount: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateSubscriptionValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price_in_pkr: Joi.number().required(),
    days: Joi.number().required(),
    discount: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteSubscriptionValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.subscribePackageUsingCreaditCardValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    promocode_id: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.proceedPackageUsingCreaditCardValidate = (req, res, next) => {
  const schema = Joi.object({
    transaction_amount: Joi.number().required(),
    country: Joi.string().optional(),
    mobile: Joi.string().optional(),
    email: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.subscribePackageUsingBankWhitelabelValidate = (
  req,
  res,
  next
) => {
  const schema = Joi.object({
    plan_id: Joi.string().required(),
    no_of_accounts_purchased: Joi.string().required(),
    amount_paid: Joi.string().required(),
    promocode_id: Joi.string().optional(),
    image: Joi.string().optional(),
    reference_number: Joi.string().optional(),
    location: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.subscribePackageUsingBankValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    promocode_id: Joi.string().optional(),
    image: Joi.string().optional(),
    reference_number: Joi.string().optional(),
    location: Joi.string().required(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.approveUserTransactionValidate = (req, res, next) => {
  const schema = Joi.object({
    transaction_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.userTransactionsValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    reference_number: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.userTransactionsForUserValidate = (req, res, next) => {
  const schema = Joi.object({
    reference_number: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.allTransactionsValidate = (req, res, next) => {
  const schema = Joi.object({
    is_approved: Joi.boolean().required(),
    page: Joi.number().required(),
    page_size: Joi.number().required(),
    reference_number: Joi.string().optional(),
    portal_id: Joi.number().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.approveAdminTransactionValidate = (req, res, next) => {
  const schema = Joi.object({
    transaction_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.adminTransactionsValidate = (req, res, next) => {
  const schema = Joi.object({
    admin_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.portalTransactionsValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().optional(),
    reference_number: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.allAdminTransactionsValidate = (req, res, next) => {
  const schema = Joi.object({
    is_approved: Joi.boolean().required(),
    page: Joi.number().required(),
    page_size: Joi.number().required(),
    reference_number: Joi.string().optional(),
    portal_id: Joi.number().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPromoCodeByIdValidate = (req, res, next) => {
  const schema = Joi.object({
    promocode_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addPromoCodeValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    percentage: Joi.number().optional(),
    user_id: Joi.number().optional(),
    fixed_amount: Joi.number().optional(),
    portal_id: Joi.number().optional(),
    count: Joi.number().optional(),
    expiry: Joi.string().required(),
  }).xor("fixed_amount", "percentage");
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.reactivatePromoCodeValidate = (req, res, next) => {
  const schema = Joi.object({
    promocode_id: Joi.string().required(),
    count: Joi.number().optional(),
    expiry: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updatePromoCodeStatusValidate = (req, res, next) => {
  const schema = Joi.object({
    promocode_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.paymentSucessValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    order_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateTransactionDetailsValidate = (req, res, next) => {
  const schema = Joi.object({
    transaction_details: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.paymentSucessWhitelabelValidate = (req, res, next) => {
  const schema = Joi.object({
    plan_id: Joi.string().required(),
    order_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.assignAccountValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    plan_id: Joi.string().required(),
    manual: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getPromoCodeUsageValidate = (req, res, next) => {
  const schema = Joi.object({
    promocode_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.superadminBuyValidate = (req, res, next) => {
  const schema = Joi.object({
    plan_id: Joi.string().required(),
    number_of_accounts_purchased: Joi.number().required(),
    portal_id: Joi.number().required(),
    bought_by_and_reason: Joi.string().required(),
    manual: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.superadminBuySubscriptionValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    user_id: Joi.number().required(),
    bought_by_and_reason: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getAdminMockTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    mock_test_type_id: Joi.number().optional(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.subtractTokensValidate = (req, res, next) => {
  const schema = Joi.object({
    type: Joi.string().valid("speaking", "non-ai", "writing").required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.logoutUserByAdminValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};


module.exports.userGoogleResponseValidate = (req, res, next) => {
  const schema = Joi.object({
    access_token: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addBranchesValidate = (req, res, next) => {
  const schema = Joi.object({
    branch_name: Joi.string().required(),
    portal_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getBranchByBranchIdValidate = (req, res, next) => {
  const schema = Joi.object({
    branch_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getBranchByPortalIdValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getBranchAccountsValidate = (req, res, next) => {
  const schema = Joi.object({
    branch_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};


module.exports.deleteBranchesValidate = (req, res, next) => {
  const schema = Joi.object({
    branch_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateStudentBranchValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    branch_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateAdminBranchValidate = (req, res, next) => {
  const schema = Joi.object({
    admin_id: Joi.number().required(),
    branch_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
}

module.exports.getMockTestAttemptsofUserValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.lastAttemptedMockTestOfUsersOrganizationValidate = (req, res, next) => {
  const schema = Joi.object({
    portal_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};


module.exports.freeSubscriptionSuccessValidate = (req, res, next) => {
  const schema = Joi.object({
    subscription_id: Joi.string().required(),
    promocode_id: Joi.string().required(),
    reference_number: Joi.string().optional(),
    location: Joi.string().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addHelpCenterValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    link: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.updateHelpCenterValidate = (req, res, next) => {
  const schema = Joi.object({
    help_center_id: Joi.string().required(),
    name: Joi.string().required(),
    link: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.deleteHelpCenterValidate = (req, res, next) => {
  const schema = Joi.object({
    help_center_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.addCountryValidate = (req, res, next) => {
  const schema = Joi.object({
    country_name: Joi.string().required(),
    currency: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
}

module.exports.updateCountryValidate = (req, res, next) => {
  const schema = Joi.object({
    country_id: Joi.string().required(),
    country_name: Joi.string().required(),
    currency: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
}

module.exports.approveCountryValidate = (req, res, next) => {
  const schema = Joi.object({
    country_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
}

module.exports.updatePlanPriceOfCountryValidate = (req, res, next) => {
  const schema = Joi.object({
    bridge_table_id: Joi.string().required(),
    price_per_account: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
}

module.exports.getSubscriptionPlansValidate = (req, res, next) => {
  const schema = Joi.object({
    country_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getWhitelabelTransactionsAccountUsageValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.getExamDateOfUserValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.assignAccountsToBranchesValidate = (req, res, next) => {
  const schema = Joi.object({
    branch_id: Joi.string().required(),
    accounts: Joi.number().required(),
    plan_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports.resetAttemptedTestQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    test_name: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// Existing validation middleware (e.g., averageScoreValidate)
module.exports.averageScoreValidate = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};


// Admin IELTS API Validations

// GET /app/api/admin/ielts-test-categories
module.exports.getIELTSTestCategoriesValidate = (req, res, next) => {
  const schema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-test-categories/add
module.exports.addIELTSTestCategoryValidate = (req, res, next) => {
  const schema = Joi.object({
    category_name: Joi.string().required().messages({
      "string.empty": "Category name is required",
    }),
    order_id: Joi.number().integer().required().messages({
      "number.base": "Order ID must be a number",
      "any.required": "Order ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-test-categories/update
module.exports.updateIELTSTestCategoryValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    category_name: Joi.string().required().messages({
      "string.empty": "Category name is required",
    }),
    order_id: Joi.number().integer().required().messages({
      "number.base": "Order ID must be a number",
      "any.required": "Order ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-test-categories/delete
module.exports.deleteIELTSTestCategoryValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// GET /app/api/admin/ielts-tests
module.exports.getIELTSTestsValidate = (req, res, next) => {
  const schema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-tests/add
module.exports.addIELTSTestValidate = (req, res, next) => {
  const schema = Joi.object({
    category_id: Joi.number().integer().required().messages({
      "number.base": "Category ID must be a number",
      "any.required": "Category ID is required",
    }),
    test_name: Joi.string().required().messages({
      "string.empty": "Test name is required",
    }),
    test_type: Joi.string().required().messages({
      "string.empty": "Test type is required",
    }),
    total_time: Joi.number().integer().required().messages({
      "number.base": "Total time must be a number",
      "any.required": "Total time is required",
    }),
    audio_url: Joi.string().allow(null).optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-tests/update
module.exports.updateIELTSTestValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    category_id: Joi.number().integer().required().messages({
      "number.base": "Category ID must be a number",
      "any.required": "Category ID is required",
    }),
    test_name: Joi.string().required().messages({
      "string.empty": "Test name is required",
    }),
    test_type: Joi.string().required().messages({
      "string.empty": "Test type is required",
    }),
    total_time: Joi.number().integer().required().messages({
      "number.base": "Total time must be a number",
      "any.required": "Total time is required",
    }),
    audio_url: Joi.string().allow(null).optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-tests/delete
module.exports.deleteIELTSTestValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// GET /app/api/admin/ielts-test-parts
module.exports.getIELTSTestPartsValidate = (req, res, next) => {
  const schema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-test-parts/add
module.exports.addIELTSTestPartValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().integer().required().messages({
      "number.base": "Test ID must be a number",
      "any.required": "Test ID is required",
    }),
    part_name: Joi.string().required().messages({
      "string.empty": "Part name is required",
    }),
    examiner_notes: Joi.string().allow(null).optional(),
    passage_text: Joi.string().allow(null).optional(),
    order_id: Joi.number().integer().required().messages({
      "number.base": "Order ID must be a number",
      "any.required": "Order ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-test-parts/update
module.exports.updateIELTSTestPartValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    test_id: Joi.number().integer().required().messages({
      "number.base": "Test ID must be a number",
      "any.required": "Test ID is required",
    }),
    part_name: Joi.string().required().messages({
      "string.empty": "Part name is required",
    }),
    examiner_notes: Joi.string().allow(null).optional(),
    passage_text: Joi.string().allow(null).optional(),
    order_id: Joi.number().integer().required().messages({
      "number.base": "Order ID must be a number",
      "any.required": "Order ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-test-parts/delete
module.exports.deleteIELTSTestPartValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// GET /app/api/admin/ielts-questions
module.exports.getIELTSQuestionsValidate = (req, res, next) => {
  const schema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-questions/add
module.exports.addIELTSQuestionValidate = (req, res, next) => {
  const schema = Joi.object({
    part_id: Joi.number().integer().required().messages({
      "number.base": "Part ID must be a number",
      "any.required": "Part ID is required",
    }),
    question_type: Joi.string().required().messages({
      "string.empty": "Question type is required",
    }),
    statement: Joi.string().allow(null).optional(),
    cue_card_text: Joi.string().allow(null).optional(),
    question_html: Joi.string().allow(null).optional(),
    image_url: Joi.string().allow(null).optional(),
    total_marks: Joi.number().integer().required().messages({
      "number.base": "Total marks must be a number",
      "any.required": "Total marks is required",
    }),
    sample_answer: Joi.string().allow(null).optional(),
    time_allowed: Joi.number().integer().required().messages({
      "number.base": "Time allowed must be a number",
      "any.required": "Time allowed is required",
    }),
    order_id: Joi.number().integer().required().messages({
      "number.base": "Order ID must be a number",
      "any.required": "Order ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-questions/update
module.exports.updateIELTSQuestionValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    part_id: Joi.number().integer().required().messages({
      "number.base": "Part ID must be a number",
      "any.required": "Part ID is required",
    }),
    question_type: Joi.string().required().messages({
      "string.empty": "Question type is required",
    }),
    statement: Joi.string().allow(null).optional(),
    cue_card_text: Joi.string().allow(null).optional(),
    question_html: Joi.string().allow(null).optional(),
    image_url: Joi.string().allow(null).optional(),
    total_marks: Joi.number().integer().required().messages({
      "number.base": "Total marks must be a number",
      "any.required": "Total marks is required",
    }),
    sample_answer: Joi.string().allow(null).optional(),
    time_allowed: Joi.number().integer().required().messages({
      "number.base": "Time allowed must be a number",
      "any.required": "Time allowed is required",
    }),
    order_id: Joi.number().integer().required().messages({
      "number.base": "Order ID must be a number",
      "any.required": "Order ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-questions/delete
module.exports.deleteIELTSQuestionValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// GET /app/api/admin/ielts-options
module.exports.getIELTSOptionsValidate = (req, res, next) => {
  const schema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-options/add
module.exports.addIELTSOptionValidate = (req, res, next) => {
  const schema = Joi.object({
    question_id: Joi.number().integer().required().messages({
      "number.base": "Question ID must be a number",
      "any.required": "Question ID is required",
    }),
    option_text: Joi.string().required().messages({
      "string.empty": "Option text is required",
    }),
    is_correct: Joi.boolean().required().messages({
      "boolean.base": "is_correct must be a boolean",
      "any.required": "is_correct is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-options/update
module.exports.updateIELTSOptionValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    question_id: Joi.number().integer().required().messages({
      "number.base": "Question ID must be a number",
      "any.required": "Question ID is required",
    }),
    option_text: Joi.string().required().messages({
      "string.empty": "Option text is required",
    }),
    is_correct: Joi.boolean().required().messages({
      "boolean.base": "is_correct must be a boolean",
      "any.required": "is_correct is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/admin/ielts-options/delete
module.exports.deleteIELTSOptionValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// User IELTS API Validations

// GET /app/api/users/ielts-tests
module.exports.getIELTSTestsForUserValidate = (req, res, next) => {
  const schema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.query);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/users/ielts-test-attempts/start
module.exports.startIELTSTestAttemptValidate = (req, res, next) => {
  const schema = Joi.object({
    test_id: Joi.number().integer().required().messages({
      "number.base": "Test ID must be a number",
      "any.required": "Test ID is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// POST /app/api/users/ielts-test-attempts/complete
module.exports.completeIELTSTestAttemptValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
    total_marks_obtained: Joi.number().required().messages({
      "number.base": "Total marks obtained must be a number",
      "any.required": "Total marks obtained is required",
    }),
    status: Joi.string().required().messages({
      "string.empty": "Status is required",
    }),
    analytics: Joi.object().optional(),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};

// GET /app/api/users/ielts-test-attempts/:id
module.exports.getIELTSTestAttemptValidate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required().messages({
      "number.base": "ID must be a number",
      "any.required": "ID is required",
    }),
  });
  const { error } = schema.validate(req.params);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }

  // Validate permission_Id in req.query
  const querySchema = Joi.object({
    permission_Id: Joi.string().optional(),
  });
  const { error: queryError } = querySchema.validate(req.query);

  if (queryError) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: queryError.details[0].message,
    });
  }

  next();
};

// POST /app/api/users/ielts-attempted-questions/submit
module.exports.submitIELTSAnswerValidate = (req, res, next) => {
  const schema = Joi.object({
    test_question_id: Joi.number().integer().required().messages({
      "number.base": "Test question ID must be a number",
      "any.required": "Test question ID is required",
    }),
    test_attempt_id: Joi.number().integer().required().messages({
      "number.base": "Test attempt ID must be a number",
      "any.required": "Test attempt ID is required",
    }),
    marks_obtained: Joi.number().required().messages({
      "number.base": "Marks obtained must be a number",
      "any.required": "Marks obtained is required",
    }),
    users_response: Joi.string().allow(null).optional(),
    response_html: Joi.string().allow(null).optional(),
    audio_url: Joi.string().allow(null).optional(),
    time_taken: Joi.number().integer().required().messages({
      "number.base": "Time taken must be a number",
      "any.required": "Time taken is required",
    }),
    permission_Id: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};


// Validation middleware for the create test endpoint
module.exports.createTestValidate = (req, res, next) => {
  const schema = Joi.object({
    testName: Joi.string().required().messages({
      "string.base": "Test name must be a string",
      "any.required": "Test name is required",
    }),
    testType: Joi.string().valid("Academic", "General").required().messages({
      "string.base": "Test type must be a string",
      "any.only": "Test type must be either 'Academic' or 'General'",
      "any.required": "Test type is required",
    }),
    category: Joi.string().valid("Listening", "Reading", "Writing", "Speaking").required().messages({
      "string.base": "Category must be a string",
      "any.only": "Category must be one of 'Listening', 'Reading', 'Writing', or 'Speaking'",
      "any.required": "Category is required",
    }),
    totalTime: Joi.number().integer().required().messages({
      "number.base": "Total time must be a number",
      "any.required": "Total time is required",
    }),
    audioUrl: Joi.string().allow(null).optional().messages({
      "string.base": "Audio URL must be a string",
    }),
    sections: Joi.array()
      .items(
        Joi.object({
          sectionNumber: Joi.number().integer().required().messages({
            "number.base": "Section number must be a number",
            "any.required": "Section number is required",
          }),
          instructions: Joi.string().allow(null).optional().messages({
            "string.base": "Instructions must be a string",
          }),
          contentHtml: Joi.string().allow(null).optional().messages({
            "string.base": "Content HTML must be a string",
          }),
          questions: Joi.array()
            .items(
              Joi.object({
                type: Joi.string()
                  .valid("fill-blank", "mcq", "selection", "matching", "completion")
                  .required()
                  .messages({
                    "string.base": "Question type must be a string",
                    "any.only": "Question type must be one of 'fill-blank', 'mcq', 'selection', 'matching', or 'completion'",
                    "any.required": "Question type is required",
                  }),
                questionHtml: Joi.string().required().messages({
                  "string.base": "Question HTML must be a string",
                  "any.required": "Question HTML is required",
                }),
                options: Joi.array()
                  .items(
                    Joi.object({
                      optionHtml: Joi.string().required().messages({
                        "string.base": "Option HTML must be a string",
                        "any.required": "Option HTML is required",
                      }),
                    })
                  )
                  .optional(),
                selections: Joi.object({
                  options: Joi.array()
                    .items(
                      Joi.object({
                        optionHtml: Joi.string().required().messages({
                          "string.base": "Option HTML must be a string",
                          "any.required": "Option HTML is required",
                        }),
                      })
                    )
                    .required()
                    .messages({
                      "array.base": "Selections options must be an array",
                      "any.required": "Selections options are required",
                    }),
                  correctMatches: Joi.object().optional(),
                }).optional(),
                answer: Joi.alternatives()
                  .try(Joi.string(), Joi.array().items(Joi.string()))
                  .allow(null)
                  .optional()
                  .messages({
                    "string.base": "Answer must be a string or an array of strings",
                  }),
              })
            )
            .required()
            .messages({
              "array.base": "Questions must be an array",
              "any.required": "Questions are required",
            }),
        })
      )
      .required()
      .messages({
        "array.base": "Sections must be an array",
        "any.required": "Sections are required",
      }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.status(400).json({
      responseCode: 500,
      message: error.details[0].message,
    });
  }
  next();
};
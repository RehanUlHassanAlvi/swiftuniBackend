const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getTests = async (values) => {
  try {
    const { rows } = await query(queries.getTests(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Tests retrieved successfully",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no IELTS Tests available",
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

module.exports.addTests = async (values) => {
  try {
    const { rows } = await query(queries.addTests(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test added successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to add IELTS Test",
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

module.exports.updateTests = async (values) => {
  try {
    const { rows } = await query(queries.updateTests(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test updated successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to update IELTS Test",
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

module.exports.deleteTests = async (values) => {
  try {
    const { rows } = await query(queries.deleteTests(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "IELTS Test deleted successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Failed to delete IELTS Test",
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


module.exports.createTestService = async (testData) => {
  const { testName, testType, category, totalTime, audioUrl, sections } = testData;

  // Start a transaction to ensure atomicity
  const client = await query("BEGIN");

  try {
    // Step 1: Get or create the test category
    let categoryResult = await query(
      "SELECT id FROM public.ielts_test_categories WHERE category_name = $1",
      [category]
    );

    let categoryId;
    if (categoryResult.rows.length === 0) {
      // Create the category if it doesn't exist
      categoryResult = await query(
        "INSERT INTO public.ielts_test_categories (category_name, order_id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING id",
        [category, 1]
      );
    }
    categoryId = categoryResult.rows[0].id;

    // Step 2: Create the test
    const testResult = await query(
      "SELECT * FROM public.add_ielts_test($1, $2, $3, $4, $5)",
      [categoryId, testName, testType, totalTime, audioUrl || null]
    );
    const testId = testResult.rows[0].id;

    // Step 3: Create sections (test parts), questions, and options/selections
    const sectionsResponse = [];
    for (const section of sections) {
      const { sectionNumber, instructions, contentHtml, questions,passage_html } = section;

      // Create the test part
      const partResult = await query(
        "SELECT * FROM public.add_ielts_test_part($1, $2, $3, $4,$5, $6)",
        [testId, `Part ${sectionNumber}`, instructions || null, contentHtml || null, sectionNumber, passage_html || null]
      );
      const partId = partResult.rows[0].id;

      // Create questions for the section
      const questionsResponse = [];
      if(questions)
      {
        for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const { type, questionHtml, options, selections, answer,image_url } = question;

        // Create the question
        const questionResult = await query(
          "SELECT * FROM public.add_ielts_question($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
          [
            partId,
            type,
            null, // statement (not used since we have questionHtml)
            null, // cue_card_text (not applicable)
            questionHtml,
            image_url, // image_url
            1, // total_marks (default to 1)
            answer ? (Array.isArray(answer) ? answer.join(", ") : answer) : null, // sample_answer
            null, // time_allowed (optional)
            i + 1, // order_id
          ]
        );
        const questionId = questionResult.rows[0].id;

        // Create options or selections
        const optionsResponse = [];
        if (type === "mcq" && options) {
          for (const option of options) {
            const { optionHtml } = option;
            const isCorrect = answer && (Array.isArray(answer) ? answer.includes(optionHtml) : answer === optionHtml);

            const optionResult = await query(
              "SELECT * FROM public.add_ielts_option($1, $2, $3)",
              [questionId, optionHtml, isCorrect || false]
            );
            optionsResponse.push(optionResult.rows[0]);
          }
        } else if ((type === "matching" || type === "selection") && selections) {
          const { options: selectionOptions, correctMatches } = selections;
          for (const option of selectionOptions) {
            const { optionHtml } = option;
            const isCorrect = correctMatches && Object.values(correctMatches).includes(optionHtml);

            const optionResult = await query(
              "SELECT * FROM public.add_ielts_option($1, $2, $3)",
              [questionId, optionHtml, isCorrect || false]
            );
            optionsResponse.push(optionResult.rows[0]);
          }
        }

        questionsResponse.push({
          ...questionResult.rows[0],
          options: optionsResponse,
        });
      }
    }

      sectionsResponse.push({
        ...partResult.rows[0],
        questions: questionsResponse,
      });
    }

    // Commit the transaction
    await query("COMMIT");

    return {
      test: testResult.rows[0],
      sections: sectionsResponse,
    };
  } catch (error) {
    // Rollback the transaction on error
    await query("ROLLBACK");
    throw error;
  }
};



module.exports.getAllTestsService = async () => {
  try {
    // Step 1: Fetch all tests with their categories
    const testsQuery = `
      SELECT 
        t.id,
        t.category_id,
        c.category_name,
        t.test_name,
        t.test_type,
        t.test_kind,
        t.total_time,
        t.audio_url,
        t.created_at,
        t.updated_at
      FROM public.ielts_tests t
      LEFT JOIN public.ielts_test_categories c ON t.category_id = c.id
      ORDER BY t.id;
    `;
    const testsResult = await query(testsQuery);

    // If no tests are found, return an empty array
    if (testsResult.rows.length === 0) {
      return [];
    }

    const tests = testsResult.rows;
    const testIds = tests.map((test) => test.id);

    // Step 2: Fetch all test parts for the tests
    const partsQuery = `
      SELECT 
        p.id,
        p.test_id,
        p.part_name,
        p.examiner_notes,
        p.passage_text,
        p.passage_html,
        p.order_id,
        p.created_at,
        p.updated_at
      FROM public.ielts_test_parts p
      WHERE p.test_id = ANY($1)
      ORDER BY p.test_id, p.order_id;
    `;
    const partsResult = await query(partsQuery, [testIds]);
    const parts = partsResult.rows;

    // Step 3: Fetch all questions for the test parts
    const partIds = parts.map((part) => part.id);
    const questionsQuery = `
      SELECT 
        q.id,
        q.part_id,
        q.question_type,
        q.statement,
        q.cue_card_text,
        q.question_html,
        q.image_url,
        q.total_marks,
        q.sample_answer,
        q.time_allowed,
        q.order_id,
        q.created_at,
        q.updated_at
      FROM public.ielts_questions q
      WHERE q.part_id = ANY($1)
      ORDER BY q.part_id, q.order_id;
    `;
    const questionsResult = await query(questionsQuery, [partIds]);
    const questions = questionsResult.rows;

    // Step 4: Fetch all options for the questions
    const questionIds = questions.map((question) => question.id);
    const optionsQuery = `
      SELECT 
        o.id,
        o.question_id,
        o.option_text,
        o.is_correct,
        o.created_at,
        o.updated_at
      FROM public.ielts_options o
      WHERE o.question_id = ANY($1)
      ORDER BY o.question_id, o.id;
    `;
    const optionsResult = await query(optionsQuery, [questionIds]);
    const options = optionsResult.rows;

    // Step 5: Structure the data hierarchically
    // Map options to questions
    const questionsWithOptions = questions.map((question) => ({
      ...question,
      options: options.filter((option) => option.question_id === question.id),
    }));

    // Map questions to parts
    const partsWithQuestions = parts.map((part) => ({
      ...part,
      questions: questionsWithOptions.filter((question) => question.part_id === part.id),
    }));

    // Map parts to tests
    const testsWithParts = tests.map((test) => ({
      ...test,
      sections: partsWithQuestions.filter((part) => part.test_id === test.id),
    }));

    return testsWithParts;
  } catch (error) {
    throw new Error(`Error fetching tests: ${error.message}`);
  }
};
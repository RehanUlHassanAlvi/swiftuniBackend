const queries = require("./queries");
const { query } = require("../../../utils/db");


module.exports.getTests = async () => {
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
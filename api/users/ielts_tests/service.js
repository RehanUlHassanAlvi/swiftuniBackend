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
        t.updated_at,
        t.answer_sheet
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

function parseMalformedAnswerSheet(str) {
  if (!str.startsWith("{") || !str.endsWith("}")) {
    throw new Error("Invalid input format");
  }

  const result = {};
  // Remove the outer braces
  const content = str.slice(1, -1);

  // Custom parser: split by commas not inside text values
  let current = "";
  let entries = [];
  let insideValue = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === "," && !insideValue) {
      entries.push(current);
      current = "";
    } else {
      if (char === ":") {
        insideValue = true;
      }
      if (insideValue && i < content.length - 1 && content[i + 1] === ",") {
        insideValue = false;
      }
      current += char;
    }
  }
  if (current) entries.push(current);

  // Now process each entry
  for (let entry of entries) {
    const colonIndex = entry.indexOf(":");
    if (colonIndex === -1) continue;
    const key = entry.slice(0, colonIndex).trim();
    const value = entry.slice(colonIndex + 1).trim();

    // Save as string or number
    const parsedKey = key;
    const parsedValue = isNaN(value) ? value : Number(value);
    result[parsedKey] = parsedValue;
  }

  return result;
}

module.exports.saveTestAttempt = async (userResponse,userId) => {
  const analytics = {};
  let totalMarks = 0;

    const res = await query(
    'SELECT answer_sheet FROM ielts_tests WHERE id = $1',
    [userResponse.testId]
  );
 if (res.rows.length === 0) {
    throw new Error("AnswerSheet/Test not found");
  }

const answerSheetRaw = res.rows[0].answer_sheet;
console.log("answerSheetRaw", answerSheetRaw);

// Fix malformed JSON
const answerSheet = parseMalformedAnswerSheet(answerSheetRaw);

console.log("answerSheet", answerSheet);

console.log("answers", userResponse.answers);

  userResponse.answers.forEach(({ questionId, userAnswer }) => {
    const correctAnswer = answerSheet[questionId.toString()];
    console.log("correctAnswer",correctAnswer);
const isCorrect =
  userAnswer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase();
    analytics[questionId] = {
      userAnswer,
      correctAnswer,
      isCorrect,
      score: isCorrect ? 1 : 0
    };
    if (isCorrect) totalMarks += 1;
  });

  const now = new Date();

  const insertQuery = `
    INSERT INTO ielts_test_attempts (
      test_id, user_id, start_time, end_time, total_marks_obtained,
      created_at, updated_at, status, analytics
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [
    parseInt(userResponse.testId),
    parseInt(userId),
    now, // start_time
    now, // end_time
    totalMarks.toString(), // total_marks_obtained
    now, // created_at
    now, // updated_at
    'completed',
    JSON.stringify(analytics)
  ];

  await query(insertQuery, values);

  return {
    responseCode: 200,
    message: "Test attempt saved successfully",
    response: {
      testId: userResponse.testId,
      userId,
      totalMarksObtained: totalMarks,
      analytics
    }
  };
}


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

module.exports.saveTestAttempt = async (userResponse, userId) => {
  console.log('Entering saveTestAttempt', { userResponse, userId });

  try {
    // Validate inputs
    if (!userResponse || !userResponse.testId || !userResponse.answers || !userId) {
      console.error('Validation failed: Missing required fields', { userResponse, userId });
      throw new Error('Missing required fields: testId, answers, or userId');
    }

    const analytics = {};
    let totalMarks = 0;

    // Fetch answer sheet from database
    let answerSheetRaw;
    try {
      console.log('Fetching answer sheet for testId:', userResponse.testId);
      const res = await query(
        'SELECT answer_sheet FROM ielts_tests WHERE id = $1',
        [userResponse.testId]
      );

      if (res.rows.length === 0) {
        console.error('Test not found for testId:', userResponse.testId);
        throw new Error('AnswerSheet/Test not found');
      }

      answerSheetRaw = res.rows[0].answer_sheet;
      console.log('Answer sheet fetched successfully:', answerSheetRaw);
    } catch (error) {
      console.error('Error fetching answer sheet:', error.message, error.stack);
      throw new Error(`Failed to fetch answer sheet: ${error.message}`);
    }

    // Parse the answer sheet
    let answerSheet;
    try {
      console.log('Parsing answer sheet:', answerSheetRaw);
      answerSheet = parseMalformedAnswerSheet(answerSheetRaw);
      console.log('Answer sheet parsed successfully:', answerSheet);
    } catch (error) {
      console.error('Error parsing answer sheet:', error.message, error.stack);
      throw new Error(`Failed to parse answer sheet: ${error.message}`);
    }

    // Log user answers
    console.log('User answers:', userResponse.answers);

    // Evaluate user responses
    try {
      userResponse.answers.forEach(({ questionId, userAnswer }) => {
        const correctAnswer = answerSheet[questionId.toString()];
        console.log(`Evaluating question ${questionId}:`, { userAnswer, correctAnswer });

        if (correctAnswer === undefined) {
          console.warn(`No correct answer found for questionId ${questionId}`);
          analytics[questionId] = {
            userAnswer,
            correctAnswer: 'N/A',
            isCorrect: false,
            score: 0
          };
          return;
        }

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
      console.log('Evaluation completed:', { totalMarks, analytics });
    } catch (error) {
      console.error('Error evaluating answers:', error.message, error.stack);
      throw new Error(`Failed to evaluate answers: ${error.message}`);
    }

    let bandScore;

    if (totalMarks >= 39) bandScore = 9.0;
    else if (totalMarks >= 37) bandScore = 8.5;
    else if (totalMarks >= 35) bandScore = 8.0;
    else if (totalMarks >= 33) bandScore = 7.5;
    else if (totalMarks >= 30) bandScore = 7.0;
    else if (totalMarks >= 27) bandScore = 6.5;
    else if (totalMarks >= 23) bandScore = 6.0;
    else if (totalMarks >= 19) bandScore = 5.5;
    else if (totalMarks >= 15) bandScore = 5.0;
    else if (totalMarks >= 13) bandScore = 4.5;
    else if (totalMarks >= 10) bandScore = 4.0;
    else if (totalMarks >= 7) bandScore = 3.5;
    else if (totalMarks >= 5) bandScore = 3.0;
    else if (totalMarks >= 3) bandScore = 2.5;
    else if (totalMarks >= 1) bandScore = 2.0;
    else bandScore = 1.0;

    console.log('Calculated Band Score:', bandScore);

    // Insert test attempt into database
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
      bandScore.toString(), // total_marks_obtained
      now, // created_at
      now, // updated_at
      'completed',
      JSON.stringify(analytics)
    ];

    try {
      console.log('Inserting test attempt into database:', values);
      await query(insertQuery, values);
      console.log('Test attempt saved successfully');
    } catch (error) {
      console.error('Error saving test attempt to database:', error.message, error.stack);
      throw new Error(`Failed to save test attempt: ${error.message}`);
    }

    // Return success response
    const response = {
      responseCode: 200,
      message: 'Test attempt saved successfully',
      response: {
        testId: userResponse.testId,
        userId,
        totalMarksObtained: totalMarks,
        analytics
      }
    };

    console.log('Exiting saveTestAttempt with success:', response);
    return response;

  } catch (error) {
    console.error('Unexpected error in saveTestAttempt:', error.message, error.stack);
    throw {
      responseCode: error.message.includes('not found') ? 404 : 500,
      message: error.message || 'Internal server error',
      error: error.message
    };
  }
};

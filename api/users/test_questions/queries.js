module.exports.getTestQuestions = () => {
  return `Select * from public.get_test_questions_of_user_by_test_id($1,$2,$3,$4,$5)`;
};

module.exports.getTestQuestionsByName = () => {
  return `Select * from public.get_test_questions_of_user_by_test_name($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`;
};

module.exports.dashboardSearch = () => {
  return `Select * from public.dashboard_search_questions($1,$2,$3,$4,$5)`;
};

module.exports.getTestQuestionsWithOptions = () => {
  return `Select * from public.get_question_with_options($1,$2,$3)`;
};

module.exports.resetAttemptedTestQuestions = () => {
  return `Select * from public.reset_practice_questions_of_user($1,$2)`;
};


module.exports.getTestQuestions = () => {
  return `Select * from public.get_mock_test_questions_by_test_id($1,$2)`;
};

module.exports.getPendingTestQuestions = () => {
  return `Select * from public.get_mock_test_questions_if_pending($1,$2)`;
};

module.exports.getTestQuestionsWithOptions = () => {
  return `Select * from public.get_question_with_options_for_mock($1)`;
};

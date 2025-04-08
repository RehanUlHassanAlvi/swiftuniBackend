module.exports.getTestQuestions = () => {
  return `Select * from public.get_mock_test_questions_by_test_id_for_admin($1)`;
};

module.exports.addAndUpdateTestQuestions = () => {
  return `Select * from public.add_mock_test_questions($1,$2)`;
};

module.exports.deleteTestQuestions = () => {
  return `Select * from public.delete_mock_test_questions_by_test_id($1)`;
};

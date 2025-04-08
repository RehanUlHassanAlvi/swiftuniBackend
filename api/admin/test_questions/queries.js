module.exports.getTestQuestions = () => {
  return `Select * from public.get_test_questions_by_test_id($1,$2,$3)`;
};

module.exports.addAndUpdateTestQuestions = () => {
  return `Select * from public.add_test_questions($1,$2)`;
};

module.exports.deleteTestQuestions = () => {
  return `Select * from public.delete_test_questions_by_test_id($1)`;
};

module.exports.updateOrderIdTestQuestions = () => {
  return `Select * from public.update_order_id_test_questions($1,$2)`;
};

module.exports.getTestQuestionsByName = () => {
  return `Select * from public.get_test_questions_of_user_by_test_name_for_admin($1,$2,$3,$4,$5,$6,$7,$8)`;
};

module.exports.getTestQuestionsWithOptions = () => {
  return `Select * from public.get_question_with_options_for_admin($1,$2)`;
};

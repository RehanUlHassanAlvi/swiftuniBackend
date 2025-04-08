module.exports.getQuestion = () => {
  return `Select * from public.get_all_questions($1,$2)`;
};

module.exports.addQuestion = () => {
  return `Select * from public.add_question($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
};

module.exports.updateQuestion = () => {
  return `Select * from public.update_question($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
};

module.exports.updateQuestionPredition = () => {
  return `Select * from public.update_question_prediction($1)`;
};

module.exports.deleteQuestion = () => {
  return `Select * from public.delete_question($1)`;
};

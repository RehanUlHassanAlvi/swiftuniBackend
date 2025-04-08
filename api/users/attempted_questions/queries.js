module.exports.addAttemptedQuestions = () => {
  return `Select * from public.add_attempted_question($1,$2,$3,$4,$5,$6)`;
};

module.exports.getAttemptedQuestionsByQuestionId = () => {
  return `Select * from public.get_attempted_questions_by_question_id($1,$2,$3,$4,$5)`;
};

module.exports.getAttemptedQuestionsOfOthersByQuestionId = () => {
  return `Select * from public.get_attempted_questions_of_others_by_question_id($1,$2,$3,$4,$5)`;
};

module.exports.deleteAttemptedQuestions = () => {
  return `Select * from public.delete_attempted_question($1)`;
};

module.exports.addCommentLike = () => {
  return `Select * from public.add_attempted_question_like($1,$2)`;
};

module.exports.deleteCommentLike = () => {
  return `Select * from public.delete_attempted_question_like($1,$2)`;
};

module.exports.addAttemptedQuestions = () => {
  return `Select * from public.add_mock_attempted_question($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
};

module.exports.addTimeoutAttemptedQuestions = () => {
  return `Select * from public.add_mock_attempted_question_timeout($1,$2,$3,$4)`;
};

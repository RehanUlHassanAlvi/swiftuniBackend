module.exports.addAppearedQuestions = () => {
  return `Select * from public.add_appeared_question($1, $2, $3, $4, $5)`;
};

module.exports.getAppearedQuestionsOfUser = () => {
  return `Select * from public.get_appeared_question($1, $2)`;
};

module.exports.deleteAppearedQuestions = () => {
  return `Select * from public.delete_appeared_question($1, $2)`;
};

module.exports.getQuestions = () => {
  return `Select * from public.get_all_ielts_questions($1)`;
};

module.exports.addQuestions = () => {
  return `Select * from public.add_ielts_question($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
};

module.exports.updateQuestions = () => {
  return `Select * from public.update_ielts_question($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
};

module.exports.deleteQuestions = () => {
  return `Select * from public.delete_ielts_question($1, $2)`;
};
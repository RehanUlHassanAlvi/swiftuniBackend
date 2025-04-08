module.exports.submitAnswer = () => {
  return `Select * from public.submit_ielts_attempted_question($1, $2, $3, $4, $5, $6, $7, $8)`;
};
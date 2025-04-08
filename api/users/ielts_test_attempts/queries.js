module.exports.startTestAttempt = () => {
  return `Select * from public.start_ielts_test_attempt($1, $2, $3)`;
};

module.exports.completeTestAttempt = () => {
  return `Select * from public.complete_ielts_test_attempt($1, $2, $3, $4, $5)`;
};

module.exports.getTestAttempt = () => {
  return `Select * from public.get_ielts_test_attempt($1, $2)`;
};
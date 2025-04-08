module.exports.getTests = () => {
  return `Select * from public.get_all_ielts_tests_for_user($1)`;
};
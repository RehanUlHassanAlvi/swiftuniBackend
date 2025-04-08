module.exports.getTests = () => {
  return `Select * from public.get_all_mock_tests_for_user($1,$2,$3)`;
};

module.exports.getMockTestUserAttemptedCount = () => {
  return `Select * from public.get_mock_test_user_attempted_count($1,$2)`;
};

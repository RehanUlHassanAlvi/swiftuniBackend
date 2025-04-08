module.exports.getAttemptedMockTests = () => {
  return `Select * from public.get_attempted_mock_tests($1)`;
};

module.exports.updateMockTestAttempt = () => {
  return `Select * from public.update_mock_test_attempt($1,$2)`;
};

module.exports.deleteMockTestAttempt = () => {
  return `Select * from public.delete_mock_test_attempt($1)`;
};

module.exports.getMockTestAnalytics = () => {
  return `Select * from public.get_analytics_of_mock_test($1)`;
};

module.exports.getMockTestScore = () => {
  return `Select * from public.get_score_of_mock_test($1)`;
};

module.exports.deleteMockAttempted = () => {
  return `Select * from public.delete_mock_attempted_development($1)`;
};

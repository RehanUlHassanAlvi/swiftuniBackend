module.exports.getTests = () => {
  return `Select * from public.get_all_mock_tests($1)`;
};

module.exports.addTests = () => {
  return `Select * from public.add_mock_test($1,$2,$3,$4,$5)`;
};

module.exports.updateTests = () => {
  return `Select * from public.update_mock_test($1,$2,$3,$4,$5)`;
};

module.exports.deleteTests = () => {
  return `Select * from public.delete_mock_test($1)`;
};

module.exports.updateOrderIdTests = () => {
  return `Select * from public.update_order_id_mock_tests($1,$2)`;
};

module.exports.lastAttemptedMockTestOfUsersOrganization = () => {
  return `Select * from public.get_last_attempted_mock_tests_of_user_of_organization($1)`;
};

module.exports.getMockTestScore = () => {
  return `Select * from public.get_score_of_mock_test_for_admin($1,$2)`;
};
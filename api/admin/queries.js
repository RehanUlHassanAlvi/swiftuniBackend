module.exports.addAdmin = () => {
  return `Select * from public.add_admin($1,$2,$3,$4,$5)`;
};

module.exports.addAdminInOther = () => {
  return `Select * from public.add_admin_in_other($1,$2,$3,$4,$5)`;
};

module.exports.getAdmin = () => {
  return `Select * from public.get_all_admins()`;
};

module.exports.getTransactionDetails = () => {
  return `Select * from public.get_transaction_details()`;
};

module.exports.adminDelete = () => {
  return `Select * from public.delete_admin($1)`;
};

module.exports.updateAdmin = () => {
  return `Select * from public.update_admin($1,$2,$3,$4,$5)`;
};

module.exports.updateTransactionDetails = () => {
  return `Select * from public.update_transaction_details_super_admin($1)`;
};

module.exports.loginAdmin = () => {
  return `Select * from public.login_admin($1,$2)`;
};

module.exports.getAllPermissions = () => {
  return `Select * from public.get_all_permissions()`;
};

module.exports.addNewPermissionsAgainstUser = () => {
  return `Select * from public.add_permissions_against_admin($1, $2)`;
};

module.exports.getPortalInfo = () => {
  return `Select * from public.get_portal_info($1, $2)`;
};

module.exports.getPortalInfoById = () => {
  return `Select * from public.get_portal_info_by_id($1)`;
};

module.exports.updateAdminBranch = () => {
  return `Select * from public.update_admin_branch($1,$2)`;
};

module.exports.getExamDateOfUser = () => {
  return `Select * from public.get_user_exam_date($1)`;
};

module.exports.averageScore = () => {
  return `Select * from public.get_average_score_of_mock_tests_of_user($1)`;
};

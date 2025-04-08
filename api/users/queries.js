module.exports.addUser = () => {
  return `Select * from public.add_user($1,$2,$3,$4,$5, $6)`;
};

module.exports.userDelete = () => {
  return `Select * from public.delete_user($1,$2)`;
};

module.exports.permanentlyDeleteUser = () => {
  return `Select * from public.delete_user_permanently($1)`;
};

module.exports.updateUser = () => {
  return `Select * from public.update_user($1,$2,$3,$4,$5,$6)`;
};

module.exports.loginUser = () => {
  return `Select * from public.login_user($1,$2, $3,$4,$5)`;
};

module.exports.userSignInWithAuth = () => {
  return `SELECT * from public.authenticate_user_with_auth($1, $2, $3,$4,$5);`;
};

module.exports.userSignUpWithAuth = () => {
  return `SELECT * from public.add_user_with_google($1, $2, $3, $4);`;
};

module.exports.verifyEmail = () => {
  return `Select * from public.verify_email($1)`;
};

module.exports.changePassword = () => {
  return `Select * from public.reset_password($1,$2)`;
};

module.exports.userAnalysis = () => {
  return `Select * from public.user_analysis($1,$2)`;
};

module.exports.updateUserAnalysis = () => {
  return `Select * from public.update_user_analysis_in_user($1,$2,$3)`;
};

module.exports.userStoredAnalysis = () => {
  return `Select * from public.get_user_stored_analysis($1,$2)`;
};

module.exports.updateExamDate = () => {
  return `Select * from public.update_user_exam_date($1,$2,$3)`;
};

module.exports.getExamDate = () => {
  return `Select * from public.get_user_exam_date($1)`;
};

module.exports.checkTokens = () => {
  return `Select * from public.get_remaining_free_tokens($1)`;
};

module.exports.subtractTokens = () => {
  return `Select * from public.subtract_free_tokens($1,$2)`;
};  

module.exports.sessionDestroy = () => {
  return `Select * from public.logout_user_by_admin($1)`;
};

module.exports.averageScore = () => {
  return `Select * from public.get_average_score_of_mock_tests_of_user($1)`;
};


module.exports.getAllStudent = () => {
  return `Select * from public.get_all_students_by_super_admin($1,$2,$3,$4)`;
};

module.exports.getStudentData = () => {
  return `Select * from public.get_student_data($1)`;
};

module.exports.getStudent = () => {
  return `Select * from public.get_student_by_admin($1,$2,$3,$4,$5)`;
};

module.exports.getStudentFromTrash = () => {
  return `Select * from public.get_student_from_trash_by_admin($1,$2,$3,$4)`;
};

module.exports.addStudent = () => {
  return `Select * from public.add_student_by_admin($1,$2,$3,$4,$5,$6,$7,$8)`;
};

module.exports.deleteStudent = () => {
  return `Select * from public.block_student_by_admin($1)`;
};

module.exports.deleteStudentFromTrash = () => {
  return `Select * from public.remove_student_from_trash_by_admin($1)`;
};

module.exports.updateStudent = () => {
  return `Select * from public.update_student($1,$2,$3,$4,$5,$6,$7)`;
};

module.exports.logoutUserByAdmin = () => {
  return `Select * from public.logout_user_by_admin($1)`;
};

module.exports.updateStudentBranch = () => {
  return `Select * from public.update_student_branch($1,$2)`;
};

module.exports.getAttemptedMockTests = () => {
  return `Select * from public.get_attempted_mock_tests($1)`;
};
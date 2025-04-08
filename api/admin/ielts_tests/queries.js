module.exports.getTests = () => {
  return `Select * from public.get_all_ielts_tests($1)`;
};

module.exports.addTests = () => {
  return `Select * from public.add_ielts_test($1, $2, $3, $4, $5, $6)`;
};

module.exports.updateTests = () => {
  return `Select * from public.update_ielts_test($1, $2, $3, $4, $5, $6, $7)`;
};

module.exports.deleteTests = () => {
  return `Select * from public.delete_ielts_test($1, $2)`;
};
module.exports.getTestParts = () => {
  return `Select * from public.get_all_ielts_test_parts($1)`;
};

module.exports.addTestParts = () => {
  return `Select * from public.add_ielts_test_part($1, $2, $3, $4, $5, $6)`;
};

module.exports.updateTestParts = () => {
  return `Select * from public.update_ielts_test_part($1, $2, $3, $4, $5, $6, $7)`;
};

module.exports.deleteTestParts = () => {
  return `Select * from public.delete_ielts_test_part($1, $2)`;
};
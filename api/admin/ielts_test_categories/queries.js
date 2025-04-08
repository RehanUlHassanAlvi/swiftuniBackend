module.exports.getTestCategories = () => {
  return `Select * from public.ielts_test_categories`;
};

module.exports.addTestCategories = () => {
  return `Select * from public.add_ielts_test_category($1, $2, $3)`;
};

module.exports.updateTestCategories = () => {
  return `Select * from public.update_ielts_test_category($1, $2, $3, $4)`;
};

module.exports.deleteTestCategories = () => {
  return `Select * from public.delete_ielts_test_category($1, $2)`;
};
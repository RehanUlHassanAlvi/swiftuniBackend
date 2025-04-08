
module.exports.getTestCategories = () => {
  return `Select * from public.get_all_test_categories()`;
};

module.exports.addTestCategories = () => {
  return `Select * from public.add_test_category($1)`;
};

module.exports.updateTestCategories = () => {
  return `Select * from public.update_test_category($1,$2)`;
};

module.exports.deleteTestCategories = () => {
  return `Select * from public.delete_test_category($1)`;
};

module.exports.updateOrderIdTestCategories = () => {
  return `Select * from public.update_order_id_test_category($1,$2)`;
};

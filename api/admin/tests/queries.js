module.exports.getTests = () => {
  return `Select * from public.get_all_tests()`;
};

module.exports.getCategorizedTests = () => {
  return `Select * from public.get_all_categorized_tests()`;
};

module.exports.addTests = () => {
  return `Select * from public.add_test($1,$2,$3,$4,$5)`;
};

module.exports.updateTests = () => {
  return `Select * from public.update_test($1,$2,$3,$4,$5,$6)`;
};

module.exports.deleteTests = () => {
  return `Select * from public.delete_test($1)`;
};

module.exports.updateOrderIdTests = () => {
  return `Select * from public.update_order_id_tests($1,$2)`;
};

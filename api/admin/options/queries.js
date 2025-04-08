module.exports.getOption = () => {
  return `Select * from public.get_all_options()`;
};

module.exports.addOption = () => {
  return `Select * from public.add_option($1,$2,$3,$4)`;
};

module.exports.updateOption = () => {
  return `Select * from public.update_option($1,$2,$3,$4,$5)`;
};

module.exports.deleteOption = () => {
  return `Select * from public.delete_option($1)`;
};

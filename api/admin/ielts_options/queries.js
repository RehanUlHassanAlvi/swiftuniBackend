module.exports.getOptions = () => {
  return `Select * from public.get_all_ielts_options($1)`;
};

module.exports.addOptions = () => {
  return `Select * from public.add_ielts_option($1, $2, $3, $4)`;
};

module.exports.updateOptions = () => {
  return `Select * from public.update_ielts_option($1, $2, $3, $4, $5)`;
};

module.exports.deleteOptions = () => {
  return `Select * from public.delete_ielts_option($1, $2)`;
};
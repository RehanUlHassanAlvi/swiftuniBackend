module.exports.getTemplate = () => {
  return `Select * from public.get_all_templates_of_portal($1,$2)`;
};

module.exports.getGrammerTemplate = () => {
  return `Select * from public.get_all_templates_of_portal($1,$2)`;
};

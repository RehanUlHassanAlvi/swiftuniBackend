module.exports.getTemplate = () => {
  return `Select * from public.get_all_templates_of_portal($1,$2)`;
};

module.exports.getGrammerTemplate = () => {
  return `Select * from public.get_all_templates_of_portal($1,$2)`;
};

module.exports.addTemplate = () => {
  return `Select * from public.add_template_grammar_pdf($1,$2,$3,$4)`;
};

module.exports.updateTemplate = () => {
  return `Select * from public.update_template($1,$2,$3,$4)`;
};

module.exports.deleteTemplate = () => {
  return `Select * from public.delete_template_grammar_pdf($1)`;
};

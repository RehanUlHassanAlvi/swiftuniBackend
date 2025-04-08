module.exports.getHelpCenters = () => {
  return `Select * from public.get_all_help_centers()`;
};

module.exports.addHelpCenter = () => {
  return `Select * from public.add_help_center($1,$2)`;
};

module.exports.deleteHelpCenter = () => {
  return `Select * from public.delete_help_center($1)`;
};

module.exports.updateHelpCenter = () => {
  return `Select * from public.update_help_center($1,$2,$3)`;
};

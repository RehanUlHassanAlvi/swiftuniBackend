module.exports.getWhitelabelAccounts = () => {
  return `Select * from public.get_all_white_label_total_accounts($1,$2)`;
};

module.exports.assignAccount = () => {
  return `Select * from public.assign_account($1, $2, $3, $4, $5)`;
};

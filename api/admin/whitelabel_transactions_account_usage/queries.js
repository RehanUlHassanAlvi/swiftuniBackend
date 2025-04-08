module.exports.getWhitelabelTransactionsAccountUsage = () => {
  return `Select * from public.get_whitelabel_transactions_by_user_id($1)`;
};

module.exports.getWhitelabelTransactionsAccountUsageAll = () => {
  return `Select * from public.get_whitelabel_transactions_account_usage_all($1)`;
};

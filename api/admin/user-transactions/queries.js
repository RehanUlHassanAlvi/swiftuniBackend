module.exports.subscribePackageUsingCreaditCard = () => {
  return `Select * from public.delete_vocab($1)`;
};

module.exports.subscribePackageUsingBank = () => {
  return `Select * from public.add_user_transaction($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`;
};

module.exports.approveUserTransaction = () => {
  return `Select * from public.approve_transaction($1)`;
};

module.exports.userTransactions = () => {
  return `Select * from public.get_user_transactions($1,$2)`;
};

module.exports.allTransactions = () => {
  return `Select * from public.get_all_user_transactions($1,$2,$3,$4,$5)`;
};

module.exports.superadminBuySubscription = () => {
  return `Select * from public.superadmin_buy_subscription_for_user($1,$2,$3)`;
};

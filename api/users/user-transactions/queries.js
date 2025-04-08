//
module.exports.subscribePackageUsingCreaditCard = () => {
  return `Select * from public.delete_vocab($1)`;
};

module.exports.subscribePackageUsingBank = () => {
  return `Select * from public.add_user_transaction($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`;
};

module.exports.paymentSuccess = () => {
  return `Select * from public.add_user_transaction_alfalah($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`;
};

module.exports.freeSubscriptionSuccess = () => {
  return `Select * from public.free_subscription_success($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`;
};

module.exports.userTransactionsForUser = () => {
  return `Select * from public.user_transactions_for_user($1,$2)`;
};

module.exports.approveAdminTransaction = () => {
  return `Select * from public.approve_admin_transaction($1)`;
};

module.exports.adminTransactions = () => {
  return `Select * from public.get_admin_transactions($1)`;
};

module.exports.portalTransactions = () => {
  return `Select * from public.get_portal_transactions($1,$2)`;
};

module.exports.allAdminTransactions = () => {
  return `Select * from public.get_all_whitelabel_transactions($1,$2,$3,$4,$5)`;
};

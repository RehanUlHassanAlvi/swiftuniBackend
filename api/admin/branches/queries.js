module.exports.getAllBranches = () => {
  return `Select * from public.get_all_branches()`;
};

module.exports.getBranchByBranchId = () => {
  return `Select * from public.get_branch_by_id($1)`;
};

  module.exports.getBranchByPortalId = () => {
  return `Select * from public.get_branches_by_portal_id($1)`;
};

module.exports.addBranches = () => {
  return `Select * from public.add_branch($1,$2)`;
};

module.exports.deleteBranches = () => {
  return `Select * from public.delete_branch($1)`;
};

module.exports.assignAccountsToBranches = () => {
  return `Select * from public.assign_revoke_accounts_to_branches($1,$2,$3,$4,$5)`;
};

module.exports.getBranchAccounts = () => {
  return `Select * from public.get_plans_by_branch_id($1)`;
};

module.exports.getBranchTransactions = () => {
  return `Select * from public.get_branch_account_transactions($1)`;
};

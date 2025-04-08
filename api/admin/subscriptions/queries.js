module.exports.getSubscription = () => {
  return `Select * from public.get_all_subscriptions()`;
};

module.exports.addSubscription = () => {
  return `Select * from public.add_subscription($1,$2,$3,$4,$5)`;
};

module.exports.updateSubscription = () => {
  return `Select * from public.update_subscription($1,$2,$3,$4,$5,$6)`;
};

module.exports.deleteSubscription = () => {
  return `Select * from public.block_subscription_by_admin($1)`;
};

module.exports.getSubscriptionPlans = () => {
  return `Select * from public.get_plans_with_subplans($1)`;
};

module.exports.getSubscriptionPlansMock = () => {
  return `Select * from public.get_plans_with_subplans_mockonly($1)`;
};

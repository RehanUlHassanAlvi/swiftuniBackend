module.exports.getCountries = () => {
  return `Select * from public.get_all_countries()`;
};

module.exports.addCountry = () => {
  return `Select * from public.add_country($1,$2)`;
};

module.exports.updateCountry = () => {
  return `Select * from public.update_country($1,$2,$3)`;
};

module.exports.approveCountry = () => {
  return `Select * from public.approve_country($1)`;
};

module.exports.getPlanOfCountry = () => {
  return `Select * from public.get_all_plans_of_country($1)`;
};

module.exports.updatePlanPriceOfCountry = () => {
  return `Select * from public.update_price_in_bridge($1,$2)`;
};


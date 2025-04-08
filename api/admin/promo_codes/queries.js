module.exports.getAllPromoCode = () => {
  return `Select * from public.get_all_promo_codes()`;
};

module.exports.getPromoCodeById = () => {
  return `Select * from public.get_promo_code_by_id($1)`;
};

module.exports.getPromoCodeForWhitelabelById = () => {
  return `Select * from public.get_promo_code_by_id_for_whitelabel_admin($1,$2)`;
};

module.exports.addPromoCode = () => {
  return `Select * from public.add_promo_code($1,$2,$3,$4,$5,$6,$7)`;
};

module.exports.updatePromoCodeStatus = () => {
  return `Select * from public.toggle_promo_code_status($1)`;
};

module.exports.getPromoCodeUsage = () => {
  return `Select * from public.count_of_promocode_used($1)`;
};

module.exports.reactivatePromoCode = () => {
  return `Select * from public.reactivate_promocode($1,$2,$3)`;
};

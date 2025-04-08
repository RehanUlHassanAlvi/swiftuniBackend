module.exports.getPromoCodeForUserById = () => {
  return `Select * from public.get_promo_code_by_id_for_user($1,$2)`;
};

module.exports.checkPromoCodeForUserById = () => {
  return `Select * from public.check_and_subtract_promocode_validity($1,$2)`;
};

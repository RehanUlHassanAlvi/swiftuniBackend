module.exports.getPortalInfo = () => {
  return `Select * from public.get_portal_info_for_users($1)`;
};

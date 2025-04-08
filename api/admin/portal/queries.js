module.exports.getPortal = () => {
  return `Select * from public.get_all_portals()`;
};

module.exports.getPortalConfiguration = () => {
  return `Select * from public.get_portal_configuration($1)`;
};

module.exports.getPortalAdmins = () => {
  return `Select * from public.get_all_portal_admins($1,$2)`;
};

module.exports.addPortal = () => {
  return `Select * from public.add_portal($1,$2,$3,$4,$5)`;
};

module.exports.updatePortal = () => {
  return `Select * from public.update_portal($1,$2,$3)`;
};

module.exports.updatePortalConfiguration = () => {
  return `Select * from public.update_portal_configuration($1,$2,$3,$4,$5,$6,$7)`;
};

module.exports.updatePortalInfo = () => {
  return `Select * from public.update_portal_info($1,$2,$3,$4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
};

module.exports.deletePortal = () => {
  return `Select * from public.delete_portal($1)`;
};

module.exports.getPortalMetrics = () => {
  return `Select * from public.get_portal_metrics($1,$2)`;
};

module.exports.getPortalById = () => {
  return `Select * from public.get_portal_by_id($1)`;
};


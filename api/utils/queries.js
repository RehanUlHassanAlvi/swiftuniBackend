module.exports.checkUser = () => {
  return `Select * from public.check_user($1)`;
};

module.exports.checkAdmin = () => {
  return `Select * from public.check_admin($1)`;
};

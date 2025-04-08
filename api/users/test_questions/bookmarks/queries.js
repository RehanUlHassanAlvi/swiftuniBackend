module.exports.addBookmark = () => {
  return `Select * from public.add_bookmark($1, $2)`;
};
module.exports.deleteBookmark = () => {
  return `Select * from public.delete_bookmark($1)`;
};

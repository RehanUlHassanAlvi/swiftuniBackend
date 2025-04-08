module.exports.getComment = () => {
  return `Select * from public.get_comments($1,$2)`;
};

module.exports.addComment = () => {
  return `Select * from public.add_comment($1,$2,$3,$4,$5,$6)`;
};

module.exports.deleteComment = () => {
  return `Select * from public.delete_comment($1)`;
};

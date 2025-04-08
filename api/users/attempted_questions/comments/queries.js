module.exports.addComment = () => {
  return `Select * from public.add_attempted_questions_comment($1,$2,$3)`;
};

module.exports.deleteComment = () => {
  return `Select * from public.delete_attempted_questions_comment($1)`;
};

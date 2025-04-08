module.exports.addCommentLike = () => {
  return `Select * from public.add_attempted_questions_comment_like($1,$2)`;
};

module.exports.deleteCommentLike = () => {
  return `Select * from public.delete_attempted_questions_comment_like($1,$2)`;
};

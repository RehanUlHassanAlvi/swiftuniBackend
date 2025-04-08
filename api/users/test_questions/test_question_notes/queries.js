module.exports.addOrEditTestQuestionNotes = () => {
  return `Select * from public.add_edit_test_question_note($1, $2, $3)`;
};

module.exports.getTestQuestionNoteOfUser = () => {
  return `Select * from public.get_test_question_note_of_user($1, $2)`;
};

module.exports.deleteTestQuestionNoteOfUser = () => {
  return `Select * from public.delete_test_question_note_of_user($1)`;
};

module.exports.getVocabBank = () => {
  return `Select * from public.get_all_vocabs($1)`;
};

module.exports.addVocabBank = () => {
  return `Select * from public.add_vocab($1,$2,$3,$4)`;
};

module.exports.updateVocabBank = () => {
  return `Select * from public.update_vocab($1,$2)`;
};

module.exports.deleteVocabBank = () => {
  return `Select * from public.delete_vocab($1)`;
};

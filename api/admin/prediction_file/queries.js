module.exports.getPredictionFile = () => {
  return `Select * from public.get_all_prediction_files($1)`;
};

module.exports.addPredictionFile = () => {
  return `Select * from public.add_prediction_file($1,$2,$3,$4)`;
};

module.exports.updatePredictionFile = () => {
  return `Select * from public.update_prediction_file($1,$2,$3,$4,$5)`;
};

module.exports.deletePredictionFile = () => {
  return `Select * from public.delete_prediction_file($1)`;
};

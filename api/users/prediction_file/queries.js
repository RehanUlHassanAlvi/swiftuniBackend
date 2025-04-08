module.exports.getPredictionFile = () => {
  return `Select * from public.get_all_prediction_files($1)`;
};

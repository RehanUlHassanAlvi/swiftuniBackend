module.exports.getStrategyVideo = () => {
  return `Select * from public.get_strategy_video_of_portal($1,$2)`;
};

module.exports.addStrategyVideo = () => {
  return `Select * from public.add_strategy_video($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
};

module.exports.updateStrategyVideo = () => {
  return `Select * from public.update_strategy_video($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
};

module.exports.deleteStrategyVideo = () => {
  return `Select * from public.delete_strategy_video($1)`;
};

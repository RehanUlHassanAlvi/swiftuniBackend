module.exports.getStrategyVideo = () => {
  return `Select * from public.get_all_strategy_videos($1)`;
};

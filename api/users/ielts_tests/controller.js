const service = require('./service');

module.exports.getTests = async (req, res, next) => {
  try {
    const result = await service.getTests();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
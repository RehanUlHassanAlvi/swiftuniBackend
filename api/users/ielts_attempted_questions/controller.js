const service = require('./service');

module.exports.submitAnswer = async (req, res, next) => {
  try {
    const result = await service.submitAnswer(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
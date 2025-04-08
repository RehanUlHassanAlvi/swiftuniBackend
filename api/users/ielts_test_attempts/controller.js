const service = require('./service');

module.exports.startTestAttempt = async (req, res, next) => {
  try {
    const result = await service.startTestAttempt(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.completeTestAttempt = async (req, res, next) => {
  try {
    const result = await service.completeTestAttempt(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.getTestAttempt = async (req, res, next) => {
  try {
    const result = await service.getTestAttempt(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
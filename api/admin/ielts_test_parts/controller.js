const service = require('./service');

module.exports.getTestParts = async (req, res, next) => {
  try {
    const result = await service.getTestParts();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.addTestParts = async (req, res, next) => {
  try {
    const result = await service.addTestParts(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateTestParts = async (req, res, next) => {
  try {
    const result = await service.updateTestParts(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.deleteTestParts = async (req, res, next) => {
  try {
    const result = await service.deleteTestParts(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
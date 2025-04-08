const service = require('./service');

module.exports.getOptions = async (req, res, next) => {
  try {
    const result = await service.getOptions();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.addOptions = async (req, res, next) => {
  try {
    const result = await service.addOptions(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateOptions = async (req, res, next) => {
  try {
    const result = await service.updateOptions(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.deleteOptions = async (req, res, next) => {
  try {
    const result = await service.deleteOptions(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
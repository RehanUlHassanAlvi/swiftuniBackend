const service = require('./service');

module.exports.getTestCategories = async (req, res, next) => {
  try {
    const result = await service.getTestCategories();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.addTestCategories = async (req, res, next) => {
  try {
    const result = await service.addTestCategories(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateTestCategories = async (req, res, next) => {
  try {
    const result = await service.updateTestCategories(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.deleteTestCategories = async (req, res, next) => {
  try {
    const result = await service.deleteTestCategories(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
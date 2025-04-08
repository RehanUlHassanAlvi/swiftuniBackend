const service = require('./service');

module.exports.getQuestions = async (req, res, next) => {
  try {
    const result = await service.getQuestions();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.addQuestions = async (req, res, next) => {
  try {
    const result = await service.addQuestions(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateQuestions = async (req, res, next) => {
  try {
    const result = await service.updateQuestions(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.deleteQuestions = async (req, res, next) => {
  try {
    const result = await service.deleteQuestions(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
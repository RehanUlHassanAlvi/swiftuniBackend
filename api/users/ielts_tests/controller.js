const service = require('./service');

module.exports.getTests = async (req, res, next) => {
  try {
    const result = await service.getTests();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};


module.exports.saveTestAttempt = async (req, res, next) => {
  try {
    const result = await service.saveTestAttempt(req.body,req.session.userID);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};
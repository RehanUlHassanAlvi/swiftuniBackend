const service = require('./service');

module.exports.getTests = async (req, res, next) => {
  try {
    const result = await service.getAllTestsService();
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.addTests = async (req, res, next) => {
  try {
    const result = await service.addTests(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.updateTests = async (req, res, next) => {
  try {
    const result = await service.updateTests(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.deleteTests = async (req, res, next) => {
  try {
    const result = await service.deleteTests(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.createTest = async (req, res) => {
  try {
    const testData = req.body;

    const result = await service.createTestService(testData);

    return res.status(200).json({
      responseCode: 200,
      message: "IELTS Test created successfully",
      response: result,
    });
  } catch (error) {
    console.error("Error creating test:", error);
    return res.status(500).json({
      responseCode: 500,
      message: "Internal Server Error",
      response: "",
    });
  }
};
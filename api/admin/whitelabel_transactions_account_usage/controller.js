const service = require("./service");

module.exports.getWhitelabelTransactionsAccountUsage = async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let values;
    values = [user_id];
    const result = await service.getWhitelabelTransactionsAccountUsage(values);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

module.exports.getWhitelabelTransactionsAccountUsageAll = async (req, res, next) => {
  try {
    const result = await service.getWhitelabelTransactionsAccountUsageAll([req.session.portalID]);
    if (result) {
      res.setHeader(
        "Strict-Transport-Security",
        "max-age=31536000; includeSubDomains"
      );
      return res.json(result);
    }
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json(result);
  } catch (ex) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
    return res.json({
      message: "Something Went Wrong",
    });
  }
};

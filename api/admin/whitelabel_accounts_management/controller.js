const service = require("./service");

module.exports.getWhitelabelAccounts = async (req, res, next) => {
  try {
    const { portalID } = req.session;
    let values;
    values = [portalID, req.session.adminID];
    const result = await service.getWhitelabelAccounts(values);
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

module.exports.assignAccount = async (req, res, next) => {
  try {
    const { portalID, adminID } = req.session;
    const { plan_id, user_id , manual } = req.body;
    let values;
    values = [portalID, plan_id, user_id, adminID, manual];
    console.log(values);
    const result = await service.assignAccount(values);
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

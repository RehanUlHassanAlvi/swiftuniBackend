const service = require("./service");

module.exports.getPromoCodeForUserById = async (req, res, next) => {
  try {
    const { promocode_id } = req.query;
    const result = await service.getPromoCodeForUserById([
      promocode_id,
      req.session.userID,
    ]);
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

module.exports.checkPromoCodeForUserById = async (req, res, next) => {
  try {
    const { promocode_id } = req.query;
    const result = await service.checkPromoCodeForUserById([
      promocode_id,
      req.session.userID,
    ]);
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

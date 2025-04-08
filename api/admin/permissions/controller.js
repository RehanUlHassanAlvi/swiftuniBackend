const service = require("./service");

module.exports.getAllPermissions = async (req, res, next) => {
  try {
    // const { mock_test_id, page = 1, page_size = 10 } = req.query;

    // const offset = (page - 1) * page_size;

    // const values = [mock_test_id, page_size, offset];
    const result = await service.getAllPermissions();
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
module.exports.addNewPermissionsAgainstUser = async (req, res, next) => {
  try {
    // const { mock_test_id, page = 1, page_size = 10 } = req.query;

    // const offset = (page - 1) * page_size;

    // const values = [mock_test_id, page_size, offset];
    const { permissions, admin_id } = req.body;
    const values = [permissions, admin_id];

    const result = await service.addNewPermissionsAgainstUser(values);
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

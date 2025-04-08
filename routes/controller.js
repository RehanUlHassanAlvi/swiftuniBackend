module.exports.checkBackend = async (req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  return res.json("Working");
};

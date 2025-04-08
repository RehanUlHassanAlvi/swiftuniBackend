const { uploadToS3 } = require("../../utils/utils");
const service = require("./service");

module.exports.getPortal = async (req, res, next) => {
  try {
    const result = await service.getPortal();
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

module.exports.getPortalConfiguration = async (req, res, next) => {
  try {
    const result = await service.getPortalConfiguration([req.session.portalID]);
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

module.exports.getPortalAdmins = async (req, res, next) => {
  try {
    const { portal_id, branch_name } = req.query;
    const result = await service.getPortalAdmins(req, [portal_id, branch_name]);
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

module.exports.addPortal = async (req, res, next) => {
  try {
    const { portal_owner_name, location, country_id, portal_name } = req.body;

    const portal_link = `https://${portal_name}.swiftuni.com`;

    const values = [portal_link, portal_owner_name, location, country_id, portal_name];

    const result = await service.addPortal(values);
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

module.exports.updatePortal = async (req, res, next) => {
  try {
    const { portal_id, portal_link, portal_owner_name } = req.body;

    const values = [portal_id, portal_link, portal_owner_name];

    const result = await service.updatePortal(values);
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

module.exports.updatePortalConfiguration = async (req, res, next) => {
  try {
    const {
      strategy_video_visible,
      template_visible,
      grammar_visible,
      self_strategy_video_visible,
      self_template_visible,
      self_grammar_visible,
    } = req.body;

    const values = [
      req.session.portalID,
      strategy_video_visible,
      template_visible,
      grammar_visible,
      self_strategy_video_visible,
      self_template_visible,
      self_grammar_visible,
    ];

    const result = await service.updatePortalConfiguration(values);
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

module.exports.updatePortalInfo = async (req, res, next) => {
  try {
    const {
      portal_id,
      facebook_link,
      whatsapp_link,
      telegram_link,
      phoneno,
      support_email,
      support_address,
      portal_logo_url,
      favicon_url,
      landing_img_url,
      youtube_link,
      youtube_thumbnail,
      portal_info,
    } = req.body;

    let newPortalLogo, newFavicon, newLandingImg, newYoutubeThumbnail;

    if (req.files) {
      if (req.files["portal_logo"]?.[0]) {
        newPortalLogo = await uploadToS3(
          req.files["portal_logo"][0],
          `PortalImages/${portal_id}/${new Date().getTime()}_portal_logo`
        );
      }
      if (req.files["favicon"]?.[0]) {
        newFavicon = await uploadToS3(
          req.files["favicon"][0],
          `PortalImages/${portal_id}/${new Date().getTime()}_favicon`
        );
      }

      if (req.files["landing_img"]?.[0]) {
        newLandingImg = await uploadToS3(
          req.files["landing_img"][0],
          `PortalImages/${portal_id}/${new Date().getTime()}_landing_img`
        );
      }
      if (req.files["youtube_thumbnail"]?.[0]) {
        newYoutubeThumbnail = await uploadToS3(
          req.files["youtube_thumbnail"][0],
          `PortalImages/${portal_id}/${new Date().getTime()}_youtube_thumbnail`
        );
      }
    }
    console.log("FILES", req.files);
    const values = [
      portal_id,
      facebook_link,
      whatsapp_link,
      telegram_link,
      phoneno,
      support_email,
      support_address,
      newPortalLogo ? newPortalLogo : portal_logo_url,
      newFavicon ? newFavicon : favicon_url,
      newLandingImg ? newLandingImg : landing_img_url,
      youtube_link,
      newYoutubeThumbnail ? newYoutubeThumbnail : youtube_thumbnail,
      portal_info,
    ];

    const result = await service.updatePortalInfo(values);
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
      message: ex.message,
    });
  }
};

module.exports.deletePortal = async (req, res, next) => {
  try {
    const { portal_id } = req.query;

    const values = [portal_id];

    const result = await service.deletePortal(values);
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

module.exports.getPortalMetrics = async (req, res, next) => {
  try {
    const result = await service.getPortalMetrics([req.session.portalID , req.session.adminID]);
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

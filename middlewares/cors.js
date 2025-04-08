module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    let headers = {};
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    headers["Access-Control-Max-Age"] = "86400"; 
    res.header(
      "Access-Control-Allow-Headers",
      "content-type,x-access-token, Set-Cookie , cache-control , x-control-type"
    );
    res.header("Access-Control-Expose-Headers", "Set-Cookie");
    res.writeHead(200, headers);
    res.end();
  } else {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "content-type,x-access-token, Set-Cookie , cache-control , x-control-type"
    );
    res.header("Access-Control-Expose-Headers", "Set-Cookie");
    next();
  }
  //next();
};

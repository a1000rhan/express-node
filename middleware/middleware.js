exports.logger = (req, res) => {
  res.status(404).json({ message: "route is not found" });
};

exports.path = (req, res, next) => {
  //console.log(`${req.method} ${req.originalUrl}`);

  // console.log(
  //   `${req.method} ${req.protocol}://${req.hostname}:${PORT}${req.originalUrl}`
  // );

  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.path}`);

  // if (req.method === "GET") {
  //   console.log("fatched");
  // }
  // if (req.method === "POST") {
  //   console.log("POST");
  // }
  next();
};

exports.hundleError = (err, req, res, next) => {
  // if (err.status) {
  //   res.status(err.status).json({ message: err.message });
  // } else {
  //   res.status(500).json({ message: "Internal Server Error" });
  // }

  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};

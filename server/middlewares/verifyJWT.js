module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      return res
        .status(403)
        .send({ success: false, message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
};

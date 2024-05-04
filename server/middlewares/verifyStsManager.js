const User = require("../models/user.model");

module.exports = verifyStsManager = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await User.findOne(query);

  if (user?.role === "sts_manager") {
    next();
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

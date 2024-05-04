const User = require("../models/user.model");

module.exports = verifyAdminOrOwn = async (req, res, next) => {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await User.findOne(query);
  // console.log(user.name, user.email);
  if (user?.role === "system_admin") {
    // console.log("vitore");
    // return res.status(403).send({ message: "forbidden access" });
    next();
  } else if (req.params.userId === user.id) {
    next();
  } else {
    return res.status(403).send({ message: "forbidden access" });
  }
};

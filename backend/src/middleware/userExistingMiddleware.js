const User = require("../models/userModel");

const userExisting = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findUserByEmail(email);
    if (user) {
      return res.status(400).send("Email address is already registered.");
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
  next();
};

module.exports = { userExisting };

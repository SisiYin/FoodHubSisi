// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send("Please log in first.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Check if token has expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).send("Token has expired. Please log in again.");
      } else {
        return res.status(403).send("Forbidden operation. Please log in.");
      }
    }
    req.user = user;
    next();
  });
};

const verification = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).send("Please log in first.");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Check if token has expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).send("Token has expired. Please log in again.");
      } else {
        return res.status(403).send("Forbidden operation. Please log in.");
      }
    }
    return res.status(200).send("Token is valid.");
  });
};

module.exports = { authenticateToken, verification };

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = process.env.SALT_ROUNDS;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    // Create a new user
    const newUser = await User.createUser(username, email, hashedPassword);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findPasswordByEmail(email);
    // Verify user exists and check password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .send("Invalid email or password. Please try again.");
    }
    // Generate JWT token
    // console.log("JWT signed user", user);
    const expiresIn = 60 * 60; // 1 hour
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
    });
    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUserInfoAfterLogin = async (req, res) => {
  try {
    const email = req.user.email;
    const userInfo = await User.findUserByEmail(email);
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

module.exports = { register, login, getUserInfoAfterLogin };

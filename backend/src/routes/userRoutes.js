const express = require("express");
const router = express.Router();
const { userController } = require("../controllers/index");
const {
  authMiddleware,
  userExistingMiddleware,
  multerMiddleware,
} = require("../middleware/index");

// Define routes for user actions (signup, login, profile updates, etc.)
router.post(
  "/register",
  userExistingMiddleware.userExisting,
  userController.register
);
router.post("/login", userController.login);

router.get(
  "/profile",
  authMiddleware.authenticateToken,
  userController.getUserInfoAfterLogin
);
router.get("/verification", authMiddleware.verification);
// router.put("/update", userController.updateProfile);

// Exporting the router object to the router/index.js
module.exports = router;

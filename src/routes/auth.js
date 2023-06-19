const express = require("express");
const authController = require("../controllers/auth-controller");
const authVerifyMiddleware = require("../middleware/auth-verify-middleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.put(
  "/update-profile",
  authVerifyMiddleware.requireSignIn,
  authController.updateProfile
);

module.exports = router;

const express = require("express");
const podcast = require("../controllers/podcast-controller");
const authVerifyMiddleware = require("../middleware/auth-verify-middleware");

const router = express.Router();

// Test routes
router.get("/hello", (req, res) => {
  res.json({ message: "hello world!" });
});

// Podcast Routes
router.post(
  "/podcast",
  authVerifyMiddleware.requireSignIn,
  authVerifyMiddleware.isAdmin,
  podcast.createPodcast
);
router.get("/podcast", podcast.getAllPodcasts);
router.put(
  "/podcast/:podcastId",
  authVerifyMiddleware.requireSignIn,
  authVerifyMiddleware.isAdmin,
  podcast.updatePodcast
);
router.delete(
  "/podcast/:podcastId",
  authVerifyMiddleware.requireSignIn,
  authVerifyMiddleware.isAdmin,
  podcast.deletePodcast
);

module.exports = router;

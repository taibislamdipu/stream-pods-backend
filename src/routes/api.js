const express = require("express");
const podcast = require("../controllers/podcast-controller");

const router = express.Router();

// Podcast Routes
router.post("/podcast", podcast.createPodcast);
router.get("/podcast", podcast.getAllPodcasts);
router.put("/podcast/:podcastId", podcast.updatePodcast);
router.delete("/podcast/:podcastId", podcast.deletePodcast);

module.exports = router;

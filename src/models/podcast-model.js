const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  host: {
    type: String,
  },
  duration: {
    type: Number,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  audioUrl: {
    type: String,
  },
});

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast;

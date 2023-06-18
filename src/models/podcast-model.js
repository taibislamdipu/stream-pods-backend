const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  audioUrl: {
    type: String,
    required: true,
  },
});

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast;

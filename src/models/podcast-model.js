const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
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
  },
  { timestamps: true, versionKey: false }
);

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast;

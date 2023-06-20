const Podcast = require("../models/podcast-model");
const slugify = require("slugify");

// Create a new podcast
exports.createPodcast = async (req, res) => {
  try {
    let { title } = req.body;

    // create podcast
    const podcast = new Podcast({ ...req.body, slug: slugify(title) });

    await podcast.save();

    res.json({
      status: "success",
      message: "Podcast created",
      data: podcast,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

// Get all podcasts
exports.getAllPodcasts = async (req, res) => {
  try {
    let allPodcasts = await Podcast.find();
    res.json({ status: "success", data: allPodcasts });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

// Update a podcast
exports.updatePodcast = async (req, res) => {
  try {
    let { title } = req.body;

    let podcast = await Podcast.findOneAndUpdate(
      { _id: req.params.podcastId },
      { ...req.body, slug: slugify(title) },
      { new: true }
    );

    res.json({
      status: "success",
      message: "Podcast updated",
      data: podcast,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

// Delete a podcast
exports.deletePodcast = async (req, res) => {
  try {
    await Podcast.findOneAndDelete({ _id: req.params.podcastId });

    res.json({
      status: "success",
      message: "Podcast deleted",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

// Search podcasts by keyword
exports.searchPodcast = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Podcast.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-imageUrl -audioUrl");

    res.json(results);
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
};

// Filter podcasts by category
exports.filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const args = {};

    if (checked.length > 0) {
      args.category = checked;
    }

    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    console.log("args => ".bgGreen, args);

    const products = await Product.find(args);
    // const products = await Product.find({category:["react","node"],price:{$gte:40,$lte:59}});
    console.log("filtered products query => ", products.length);

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

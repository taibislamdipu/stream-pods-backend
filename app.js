// Basic imports
const { readdirSync } = require("fs");
const express = require("express");
const app = express();
const router = require("./src/routes/api");

// Security Middleware
const cors = require("cors");

// Database Import
const mongoose = require("mongoose");
const { yellow } = require("colors");

// Security Middleware Implementation
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Database Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      // `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mbdirqo.mongodb.net/stream-pods`,
      `mongodb://127.0.0.1:27017/stream-pods`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      }
    );

    console.log("Connected to MongoDB Database".green);
  } catch (error) {
    console.error("Connection error:".bgRed, error);
  }
};

connectToDatabase();

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB server", yellow);
});

// Routes Implementation
readdirSync("./src/routes").map((r) =>
  app.use("/api/v1", require(`./src/routes/${r}`))
);

// Undefined Route
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "404 not found!",
  });
});

module.exports = app;

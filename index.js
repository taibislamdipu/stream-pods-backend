// Entry point for the application

// Apply the process.env to all files
require("dotenv").config();
require("colors");

const app = require("./app");
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`stream-pods server is running.`));

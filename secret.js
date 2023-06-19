const PORT = process.env.PORT || 8000;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_URL_PROD = process.env.MONGODB_URL_PROD;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { PORT, MONGODB_URL, MONGODB_URL_PROD, JWT_SECRET };

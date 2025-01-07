const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // For parsing application/json

// Example route
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
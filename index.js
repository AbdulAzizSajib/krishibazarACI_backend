const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware to handle Cross-Origin Resource Sharing
app.use(cors());
// Parse incoming requests with JSON payloads
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

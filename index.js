const express = require("express");
const connectDB = require("./db");
const app = express();

const port = 3000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hell World");
});

app.listen(port, () => {
  console.log("App is listening on port ${port}");
});

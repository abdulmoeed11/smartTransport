const express = require("express");
const connectDB = require("./db");
const userRouter = require("./src/components/user/routes/userRoutes");
const app = express();

require("dotenv").config;

const port = process.env.PORT || 5000;

connectDB();

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log("App is listening on port ${port}");
});

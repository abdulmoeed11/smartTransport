require("dotenv").config();
//Continuing
const express = require("express");
const connectDB = require("./src/configs/db");
const userRouter = require("./src/components/user/routes/userRoutes");
const cardRouter = require("./src/components/card/routes/cardRoutes");
const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware");
const app = express();

const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/cards", cardRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

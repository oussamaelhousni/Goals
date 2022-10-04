const express = require("express");
const color = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config({
  path: "../.env",
});
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router middleware
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Start listening on PORT : ${PORT}`);
});

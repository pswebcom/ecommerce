const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

//app
const app = express();

//db

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("db conected"))
  .catch((err) => console.log("db conn error", err));

//middleware --->>is basically afunction that runs in between
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

//routes middleware-----/api is a prefix
readdirSync("./routes").map((route) => {
  console.log();
  app.use("/api", require("./routes/" + route));
});

//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

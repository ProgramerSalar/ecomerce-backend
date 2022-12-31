const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
const { auth } = require("firebase-admin");

// app
const app = express();

// db
const URI = process.env.DATABASE;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection error", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// route
app.use("/api", authRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));

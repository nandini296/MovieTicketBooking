const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");


app.use(cors());
app.use(express.json());
app.use("api/auth", userRoutes);
app.use(userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", (req, res) => {
  res.send("GET Request Called!");
});

app.listen(PORT, (err) => {
  console.log("Server Listening on PORT ", PORT);
});

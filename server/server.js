require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors')
const app = express();
const cookieParser = require("cookie-parser");
app.use(cors())
app.use(express.json())
app.use(cookieParser());
// connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);
app.use("/lecturer",require('./src/lecturers/Routers/lecturerRouter'))
app.use("/secretary",require('./src/secretarys/Routers/secretaryRouter'));
// load token for server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
// set up socket io
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

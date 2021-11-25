require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
app.use(cors())
app.use(express.json())
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
// Routes
app.use("/api", require("./src/secretarys/routers/scheduleRouter"));


// app.use("/sendMail", require("./src/user/routers/mailSeriveRoutes"));
app.use("/login",require('./src/lecturers/Routers/lecturerRouter'))
app.use("/login",require('./src/secretarys/Routers/secretaryRouter'));
// load token for server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;
// set up socket io
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

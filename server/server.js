require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(morgan("combined"));
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
app.use("/api", require("./src/lecturers/Routers/scheduleRouter"));
app.use("/api", require("./src/lecturers/Routers/registSubjectsRouter"));

//Mail Service
app.use("/sendMail", require("./src/MailService/mailServiceRouter"));

//Excel Service
app.use("/excel", require("./src/Excel/excelRoutes"));

//Login
app.use("/login", require("./src/lecturers/Routers/lecturerRouter"));
app.use("/login", require("./src/secretarys/Routers/secretaryRouter"));

app.use("/import", require("./src/secretarys/routes/Routes"));
app.use("/lecturer", require("./src/lecturers/Routers/lecturerRouter"));
app.use(
  "/lecturersTieuLuan",
  require("./src/lecturers/Routers/tieuLuanRoutes")
);
app.use("/secretary", require("./src/secretarys/Routers/secretaryRouter"));
// load token for server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const namHocSchema = new Schema({
  namHoc: [],
  hocKy: [],
});
module.exports = mongoose.model("namHoc", namHocSchema);

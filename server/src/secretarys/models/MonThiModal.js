const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const monThiSchema = new Schema({
  maHp: String,
  tenHp: String,
  nhomKT: String,
  hinhThucKT: String,
  GVGD: String,
  maGV: String,
  heDT: String,
  chuongTrinh: String,
  doViToChuc: String,
  toKiem: String,
  soLuong: Number,
  maKhoa: String,
  maChuongTrinh: String,
  ngayKiemTra: String,
  gioBatDau: String,
  maPhong: String,
  soPhutKiemTra: Number,
  canBoCoiKiem3: String,
  maCanBoCoiKiem3: String,
  ghiChu: String,
});
module.exports = mongoose.model("monThi", monThiSchema);

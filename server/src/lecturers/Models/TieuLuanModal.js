const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tieuLuanSchema = new Schema({
  ngayKiemTra: Date,
  gioBatDau: String,
  toKiem: String,
  maPhong: String,
  soPhutKiemTra: Number,
  maHocPhan: String,
  tenHocPhan: String,
  nhomKiemTra: String,
  toKiem: String,
  soLuongSinhVien: Number,
  donViToChucKiemTra: String,
  chuongTrinhBoMon: String,
  hinhThucKiemTra: String,
  GVGD: String,
  maGV: String,
  heDaoTao: String,
  maKhoa: String,
  maChuongTrinh: String,
  status: String,
  phanHoi: Boolean,
  moTa: String,
  deXuat: {
    moTa: String,
    ngayKiemTra: Date,
    gioBatDau: String,
    maPhong: String,
    soPhutKiemTra: Number,
  },
  tenHocKi: String,
});
module.exports = mongoose.model("tieuLuan", tieuLuanSchema);

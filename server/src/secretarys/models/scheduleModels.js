const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  GVGD: String,
  chuongTrinhBoMon: String,
  donViToChucKiemTra: String,
  giangVien: [
    {
      email: String,
      hoTen: String,
      maKhoa: String,
      maVienChuc: String,
      maChuongTrinh: String,
    },
  ],
  gioBatDau: String,
  heDaoTao: String,
  hinhThucKiemTra: String,
  maGV: String,
  maKhoa: String,
  maPhong: String,
  soLuongSinhVien: Number,
  soPhutKiemTra: Number,
  tenHocKi: String,
  tenHocPhan: String,
  toKiem: String,
  maHocPhan: String,
  ngayKiemTra: String,
  nhomKiemTra: String,
  maChuongTrinh: String,
});

module.exports = mongoose.model("Schedules", scheduleSchema);

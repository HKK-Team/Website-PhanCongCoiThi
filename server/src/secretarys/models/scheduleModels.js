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
  ngayKiemTra: Date,
  nhomKiemTra: String,
  maChuongTrinh: String,
  canBoCoiKiem3: String,
  maCanBoCoiKiem3: String,
  canBoDuBi: String,
  maCanBoDuBi: String,
  public: Boolean,
});

module.exports = mongoose.model("Schedules", scheduleSchema);

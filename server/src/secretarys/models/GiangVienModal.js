const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const danhSachGiangVien = new Schema({
    hoTen : String,
    maVienChuc : String,
    email : String,
    maKhoa: String,
    maChuongTrinh: String,
    created: Date
})
module.exports = mongoose.model('danhSachGiangVien',danhSachGiangVien);
const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    GVGD: String,
    chuongTrinhBoMon: String,
    donViToChucKiemTra: String,
    giangVien:{
        type: Array,
        default: []
    },
    gioBatDau: { type: Date, default: Date.now },
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
    ngayKiemTra: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Schedules', scheduleSchema)
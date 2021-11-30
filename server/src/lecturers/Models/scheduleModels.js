const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    GVGD: String,
    chuongTrinhBoMon: String,
    donViToChucKiemTra: String,
    giangVien:{
        type: Array,
        default: []
    },
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
    __v:Number
})

module.exports = mongoose.model('Schedules', scheduleSchema)
const mongoose = require('mongoose')

const registSubjectsSchema = new mongoose.Schema({
    maGiangVien: String,
    maKhoa: String,
    hoTen: String,
    maVienChuc:String,
    email:String,
    dsDangKi:{
        maHp:String,
        tenHp:String,
        nhomKT:String,
        hinhThucKT:String,
        thoiGianBatDau:String,
        thoiGianKetThuc:String,
        maPhong:String,
        ngayDangKi:{ type: Date, default: Date.now },
    },
    ngayTao: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Danhsachdangkis', registSubjectsSchema)
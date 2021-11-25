const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const monThiSchema = new Schema({
    maHp : String,
    tenHp : String,
    nhomKT : String,
    hinhThucKT :String,
    GVGD : String,
    maGV : String,
    heDT : String,
    chuongTrinh : String,
    doViToChuc : String,
    toKiem : Number,
    soLuong : Number,
    maKhoa : String
})
module.exports = mongoose.model('monThi',monThiSchema);
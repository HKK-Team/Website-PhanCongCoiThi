const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    chuongTrinhDaoTao : String,
    email : String,
    hoTen : String,
    maKhoa : String,
    soDienThoai : String,
    passWord : String
})
module.exports = mongoose.model('thukiAccounts',userSchema);
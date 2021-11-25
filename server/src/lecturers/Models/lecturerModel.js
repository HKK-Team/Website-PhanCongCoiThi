const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const lecturerSchema = new Schema({
    firstName : String,
    lastName : String,
    fullName : String,
    email : {
        type : String,
        require : true,
    },
    Phone : String,
    Address :String,
    ID : String,
    chuongTrinhDaoTao : String,
    maVienChuc : String,
    maKhoa : String,
    image : String,
    accessToken : String,
    token_ID : String,
    Api : String
})
module.exports = mongoose.model('giangvienAccount',lecturerSchema);
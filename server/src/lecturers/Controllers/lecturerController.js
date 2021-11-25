const Lecturer = require('../Models/lecturerModel');
const lecturerCtrl = {
    login : async(req,res) =>{
        const lecturer = await Lecturer.findOne({ID : {$eq:req.body.ID}})
        if(lecturer){
            return res.status(400).json({msg : "User exist!"});
        }
        const newLecturer = new Lecturer({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            fullName : req.body.fullName,
            email : req.body.email,
            Phone : '',
            Address : '',
            ID : req.body.ID,
            chuongTrinhDaoTao : '',
            maVienChuc : '',
            maKhoa : '',
            image : req.body.image,
            accessToken : req.body.accessToken,
            token_ID : req.body.token_ID,
            Api : req.body.Api
        });
        await newLecturer.save();
        res.status(200).json({msg:"Login Success!"})
    },
};
module.exports = lecturerCtrl
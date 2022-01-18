const Lecturer = require('../Models/lecturerModel');
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
}
const lecturerCtrl = {
    login : async(req,res) =>{
        try{
            console.log(req.body);
            const lecturer = await Lecturer.findOne({ID : {$eq:req.body.ID}})
            if(!lecturer){
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
            }
            return res.status(200).json({msg :"Login Success!"})
        }
        catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    GetUser : async(req,res) =>{
        const features = new APIfeatures(Lecturer.find(), req.query)
            .filtering()
        const user = await features.query
        res.json(user)
    },
    EditUser : async(req,res) =>{
        // check your id
        user = req.body;
        // update to mongodb
        const editUser = new Lecturer(user);
        try {
            await Lecturer.updateOne({ _id: req.body._id }, editUser);
            return res.status(200).json("Bạn đã update thông tin thành công!")

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};
module.exports = lecturerCtrl
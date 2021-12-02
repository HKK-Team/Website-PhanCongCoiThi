const Secretary = require('../Models/secretaryModel');
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
const secretaryCtrl = {
    login : async(req,res) =>{
        const secretary = await Secretary.findOne({email : {$eq : req.body.email}})
        if(!secretary)
        {
            return res.status(400).json({msg: "Email doesn't Exist!"});
        }
        if(secretary.passWord !== req.body.password){
            return res.status(400).json({msg: "Password incorrect!"});
        }
        return res.status(200).json({msg : "Login SuccessFully!"})
    },
    getUser: async (req, res) =>{
        try {
            const features = new APIfeatures(Secretary.find(), req.query)
            .filtering()
            const user = await features.query
            res.json({
                status: 'success',
                result: user.length,
                user : user
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
module.exports = secretaryCtrl
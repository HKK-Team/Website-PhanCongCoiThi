const Secretary = require('../Models/secretaryModel');
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
        return res.status(200).json({msg: "Login SuccessFully!"});
    }
}
module.exports = secretaryCtrl
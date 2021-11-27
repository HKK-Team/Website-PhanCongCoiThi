const Secretary = require('../Models/secretaryModel');
const jwt = require('jsonwebtoken');
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
        const accesstoken = createAccessToken({id: secretary._id})
        const refreshtoken = createRefreshToken({id: secretary._id})
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/secretary/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
        res.json({accesstoken})
    },
    // logout
    logout: async (req, res) =>{
        try {
            // clear refreshtoken (refresh_token = thẻ để ra vào) 
            res.clearCookie('refreshtoken', {path: '/secretary/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    // refreshToken
    refreshToken: (req, res) =>{
        try {
            // refresh token when login or gegister 
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})
            // verify token
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, secretary) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: secretary.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        
    },
    // get User
    getUser: async (req, res) =>{
        try {
            const secretary = await Secretary.findById(req.user.id)
            if(!secretary) return res.status(400).json({msg: "User does not exist."})

            res.json(secretary)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}
const createAccessToken = (secretary) =>{
    return jwt.sign(secretary, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (secretary) =>{
    return jwt.sign(secretary, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = secretaryCtrl
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req,res,next)=>{
    try{
        if(!req.cookies.token) {
            return res.status(401).json({ success: false, message: "User not logged in" });
        }

        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel.findOne({email:decode.userEmail, _id: decode.userId});
        
         if (!user) {
            return res.status(401).json({ success: false, message: "User not logged in" })
        }

        req.user = user;

        next();
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ success: false, message: "User not logged in" });
    }
}
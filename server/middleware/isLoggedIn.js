const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req,res,next)=>{
    try{
        if(!req.cookies.token) {
            return res.redirect('/user/login-user');
        }

        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel.findOne({email:decode.userEmail, _id: decode.userId});
        
         if (!user) {
            return res.redirect('/user/login-user'); // ✅ `return` use kiya
        }

        req.user = user;

        next();
    }
    catch (error) {
        console.error('JWT Verification Error:', error);
        return res.redirect('/user/login-user'); // ✅ `return` use kiya
    }
}
const jwt = require('jsonwebtoken');

const genrateToken = (user)=>{
    try{
        const token = jwt.sign({userEmail:user.email,userId:user._id,role:user.role}, process.env.JWT_KEY,{expiresIn:'7d'});
        
        return token;
    }
    catch(error){
        console.error("JWT Error:", error.message);
        return null;
    }
}

module.exports = genrateToken;
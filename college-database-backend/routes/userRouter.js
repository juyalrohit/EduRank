const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const hashPassword = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/genrateToken');
const bcrypt = require('bcrypt');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const Transpoter = require('../config/nodemailer-transproter')
const {WELCOMING_TEMPLATE, RESET_OTP} = require('../config/emailTemplates');
const reviewModel = require('../models/review-model');

router.post('/register-user', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
  
    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.json({ success: false, message: "User already exists" });
      }
  
      if (password.length < 6) {
        return res.json({ success: false, message: "Password must be at least 6 characters long" });
      }
  
      const hashPasswordValue = await hashPassword(password);
  
      const user = await userModel.create({ name, email, password : hashPasswordValue });
      const token = generateToken(user);
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });

      const mailHtml = WELCOMING_TEMPLATE
      .replace("[User's First Name]",name ) // if you have the user's first name
  
    
     
    
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to EduRank 🎉',
      html: mailHtml,
    };
    
     await Transpoter.sendMail(mailOption);
    
      res.status(201).json({ success: true, message: "Sign Up Successfully" });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  




router.post('/login-user', async(req,res)=>{
    
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) return res.json({success:false,message:"Email or password is wrong!"});

        // ✅ Fixing the order
        const result = await bcrypt.compare(password, user.password);
        if (!result) return res.json({success:false,message:"Email or password is wrong!"});

        const token = generateToken(user);

        // ✅ Setting cookie
        res.cookie('token', token, { httpOnly: true, secure: true }); 

        res.status(200).json({success:true,message:'Logged In '});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
});

router.get('/check-user', isLoggedIn ,(req,res)=>{
    try {
        res.status(200).json({ success:true,message: "User is authenticated" });
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
   
})

router.get('/logout-user',(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly : true,
            secure : process.env.NODE_ENV==='production',
            sameSite : process.env.NODE_ENV==='production' ? 'none':'strict'
        })

        res.json({success:true,message:"Logged Out"})

    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
})

router.get('/get-user',isLoggedIn,(req,res)=>{
    try{
    if (!req.user) {
        return res.status(401).send("User not authenticated");
    }
    res.status(200).json(req.user);
}
catch(error){
    return res.json({success:false,message:error.message})
}
})


router.post('/send-password-otp',async(req,res)=>{
   const {email} = req.body;
   if(!email){
     return res.status(500).json({success:false,message:'Missing Details'});
   }

   try {
     const user = await userModel.findOne({email});

     if(!user){
       return res.status(404).json({success:false, message:"User Not Found!"});
     }

     const otp = String(Math.floor(100000+Math.random()*900000))
     //Math.floor(MIN + Math.random() * (MAX - MIN + 1))
     // 6 digit Max Number 999999 and minimum 100000 range (99999-10000 + 1) = 900000

     user.resetOtp = otp;
     user.resetOtpExpireAt = Date.now()* 15 * 60 * 1000;
     await user.save();

     const mailOption = {
          from : process.env.SENDER_EMAIL,
          to : email,
          subject: "Your EduRank Password Reset OTP (Valid for 10 Minutes)",
          html : RESET_OTP.replace('[OTP]',otp).replace("[User's First Name]",user.name)
     }

     await Transpoter.sendMail(mailOption);
    
     return res.json({success:true,message:"OTP sent to your email!"})
   
    
   } catch (error) {
    
   }
})

router.post('/reset-password',async(req,res)=>{
  const {email,newPassword,otp} = req.body;

  if(!email || !newPassword ||!otp){
    return res.json({success:false,message:"Missing Details"})
  }

  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success:false, message:"User not found."});
    }

    if(otp.resetOtp==="" || otp !== user.resetOtp){
       return res.json({success:false, message:"Invalid OTP."})
    }

    if(user.resetOtpExpireAt<Date.now()){
       return res.json({success:false, message:"OTP Expired!"})
    }

    const hashPassword = await bcrypt.hash(newPassword,10);
    user.password = hashPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.json({success:true, message:"Password has been reset successfully"})

    
  } catch (error) {
    return res.json({success:false, message:error.message});
  }
})



module.exports = router;
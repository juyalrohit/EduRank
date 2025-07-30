
const express = require('express');
const Transpoter = require('../config/nodemailer-transproter')
const router = express.Router();


 router.post("/send-message", async (req, res) => {
    const {name,email,message} = req.body;

   if (!email || !name || !message) {
       return res.status(400).json({ success: false, message: "Please fill all the details!" });
}

    try {
        const mailOption = {
            from:email,
            to:process.env.RECIEVER_EMAIL,
            subject:`Message from ${name}`,
            html:message
        }

        await Transpoter.sendMail(mailOption);
        return res.status(200).json({success:true,message:"Message sent successfully!"})
        
    } catch (error) {
        console.error("Error in contact route:", error);
        return res.status(500).json({success:false,message:"Something went wrong!"});
        
    }
 }
);

module.exports  = router;
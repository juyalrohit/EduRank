
const express = require('express');
const Transpoter = require('../config/nodemailer-transproter')
const router = express.Router();


 router.post("/contact-team", async (req, res) => {
    const {name,senderMail,message} = req.body;

   if (!senderMail || !name || !message) {
       return res.status(400).json({ success: false, message: "Please fill all the details!" });
}

    try {
        const mailOption = {
    from: process.env.SENDER_EMAIL,  // verified sender
    to: process.env.RECIEVER_EMAIL,  // your receiving inbox
    subject: `Message from ${name}`,
    replyTo: senderMail,  // so you can hit reply to respond to the user
    html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Sender's Name:</strong> ${name}</p>
        <p><strong>Sender's Email:</strong> ${senderMail}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `
};


       await Transpoter.sendMail(mailOption);
        return res.status(200).json({success:true,message:"Message sent successfully!"})
        
    } catch (error) {
        console.error("Error in contact route:", error);
        return res.status(500).json({success:false,message:"Something went wrong!"});
        
    }
 }
);


router.post('/contact-faculty',async(req,res)=>{
    const {name,senderEmail,selectedEmail,message,subject} = req.body;
   
    
    if(!name || !senderEmail || !selectedEmail || !message || !subject ){
        return res.json({success:false,message:"details missing!"});
    }


    try {

        const mailOption = {
            from:process.env.SENDER_EMAIL,
            to:selectedEmail,
            subject:subject,
            html: `
        <h3>Message from Student</h3>
        <p><strong>Sender's Name:</strong> ${name}</p>
        <p><strong>Sender's Email:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong><br/>${message}</p>
    `
    }

    await Transpoter.sendMail(mailOption)

    res.json({success:true,message:"message sent succefully!"})



        
    } catch (error) {

        res.json({success:false,message:error.message});
        
    }
})


module.exports  = router;
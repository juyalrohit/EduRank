const express = require('express');
const router = express.Router();
const transpoter = require('../config/nodemailer-transproter')

const teacherModel = require('../models/teacher-model');
const departmentModel = require('../models/department-model');


router.get('/teacher-department', async(req,res)=>{
    try{
        const teachers = await teacherModel.find();
        const departments = await departmentModel.find();
        
        res.status(200).json({ teachers, departments });

    }
    catch(error){
        res.status(501).send("Something went wrong",error);
    }
})


router.post('/send-email',async(req,res)=>{
    const {name,senderEmail,selectedEmail,message,subject} = req.body;
    console.log("heloo")
    
    if(!name || !senderEmail || !selectedEmail || !message || !subject ||9){
        return res.json({success:false,message:"details missing!"});
    }


    try {

        const mailOption = {
            from:senderEmail,
            to:selectedEmail,
            subject:subject,
            html:message
    }

    await transpoter.sendMail(mailOption)

    res.json({success:true,message:"message sent succefully!"})



        
    } catch (error) {

        res.json({success:false,message:error.message});
        
    }
})

module.exports = router;
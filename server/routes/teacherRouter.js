const express = require('express');
const router = express.Router();
const teacherModel = require('../models/teacher-model');
const upload = require('../middleware/multer-config');
const departmentModel = require('../models/department-model');
const { populate } = require('dotenv');



router.post('/create-teacher', upload.single('picture'), async (req, res) => {
    try {
        const { name, email, position, departmentName,phone, picture } = req.body;
      
        
        // Find department
        const department = await departmentModel.findOne({ name: departmentName });
        if (!department) return res.status(404).send(`No department exists with the name of ${departmentName}`);
        
        // Create new teacher
        const newTeacher = await teacherModel.create({ 
            name, 
            email, 
            position, 
            picture, 
            department: department._id ,
            phone
        });
        
        department.teacher.push(newTeacher._id);
        await department.save(); 
        
        
        res.status(200).json({ message: "Teacher is created", teacher: newTeacher }); // ✅ FIXED
    } catch (error) {
        console.error("Error creating teacher:", error);
        res.status(501).send('Something went wrong!');
    }
});

router.get('/get-teachers', async (req, res) => {
    try {
        const teachers = await teacherModel.find().populate('department', 'name').populate('ratings');
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).send('Something went wrong');
    }
});

router.get('/get-teacher/:id',async(req,res)=>{
    try{
       const teacher = await teacherModel.findById(req.params.id).
       populate('department','name').
       populate({path : 'ratings', populate :{path:'user'}});

       if(!teacher) return res.status(404).send("Teacher Not Found");
       res.status(200).json(teacher);
    }
    catch(error){
       console.log("Error fetching teacher",error);
       res.status(500).send('Something went wrong!');
    }
})

router.post('/update-teacher',async(req,res)=>{
    const {teacherId,departmentId} = req.body;
    const department = await departmentModel.findById({_id : departmentId});
    department.teacher.push(teacherId);

    await department.save();

    res.send("Done")

})

// router.post('/request-teacher-role', isLoggedIn, async (req, res) => {
//     const { teacherIdCard } = req.body;  // Koi proof ya ID maange

//     if (!teacherIdCard) return res.status(400).send("Teacher ID proof required!");

//     // Admin manually approve karega
//     await VerificationRequest.create({ userId: req.user._id, teacherIdCard });

//     res.status(200).send("Request submitted. Admin will verify.");
// });


module.exports = router;

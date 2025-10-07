const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer-config');
const departmentModel = require('../models/department-model');
const { populate } = require('dotenv');




router.post('/create-department', async(req,res)=>{
     try{
        const { 
            name,
            deptEmail,
            course,
            students,
            about,
            deptPicture,
            deptPhone,
            foundedYear,
            head
    } = req.body;
        
        //  const headPicture = req.file ? `/uploads/${req.file.filename}` : null

         const courseArray = course ? course.split(',').map(item => item.trim()) : [];

         const department = await departmentModel.create({name,
            deptEmail,
            course:courseArray,
            students,
            about,
            deptPicture,
            deptPhone,
            foundedYear,
            head

        });

        res.status(201).send("Department is added");
     }
     catch(error){
        console.log("Error creating reviews",error)
        res.status(500).send("Something went wrong!")
     }
});

router.get('/get-departments', async (req, res) => {
   try {
       const departments = await departmentModel.find()
           .populate('teacher', 'name').populate('ratings'); // teacher ka naam dikhao
       departments.sort((a,b)=>a.ratings-b.ratings);
       res.status(200).json(departments);
   } catch (error) {
       console.error('Error fetching departments:', error);
       res.status(500).send('Something went wrong');
   }
});

router.get('/get-department/:id', async (req, res) => {
   try {
       const department = await departmentModel.findById(req.params.id)
           .populate({path:'teacher', 
              populate : {path : 'ratings'}
            }) 
           .populate({path:'ratings', populate :{path:'user'}}); // reviews dikh
           
       if (!department) return res.status(404).send('Department not found');
       const currentYear = new Date().getFullYear();
       const yearsOfDevelopment = currentYear - department.foundedYear;
       

       res.status(200).json({ ...department.toObject(), yearsOfDevelopment });
       
   } catch (error) {
       console.error('Error fetching department:', error);
       res.status(500).send('Something went wrong');
   }
});

router.get('/',  async(req,res)=>{
  
  res.send("Everything is fine")
})
module.exports = router;
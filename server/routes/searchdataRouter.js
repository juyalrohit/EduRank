const express = require('express');
const router = express.Router();

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



module.exports = router;
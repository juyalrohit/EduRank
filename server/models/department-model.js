const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    name : {type : String, required: true},
    deptEmail : {type: String, required: true},
    course : [],
    students : {type: Number},
    about : {type:String},
    deptPicture : {type : String},
    deptPhone :{type:String, required:true},
    teacher : [{type: mongoose.Schema.Types.ObjectId , ref:'teacher'}],
    avgRating: { type: Number, default: 0 },
    ratings : [{type: mongoose.Schema.Types.ObjectId, ref:'review'}],
    foundedYear: { type: Number, required: true },
    head : {type:String, required:true}
});

module.exports = mongoose.model('department',departmentSchema);
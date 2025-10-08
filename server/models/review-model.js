const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({

    knowledge: { type: Number, required: true, min: 1, max: 10 }, // Subject knowledge

    teachingStyle: { type: Number, required: true, min: 1, max: 10 }, // How engaging they are

    assessmentFairness: { type: Number, required: true, min: 1, max: 10 }, // Fair grading

    studentSupport: { type: Number, required: true, min: 1, max: 10 }, // Helping nature

    overallRating: { type: Number, default: function() {  
        return (this.knowledge + this.teachingStyle + this.assessmentFairness + this.studentSupport) / 4;
    }}, 

    comment : {type:String,required:true},
    user : {type: mongoose.Schema.Types.ObjectId, ref:'user'},
    type : {type : String, enum :['department','teacher'], required:true},
    targetId : {type : mongoose.Schema.Types.ObjectId,required :true ,refPath:'type'},
    upVote :[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    downVote :[{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    replies :[{type:mongoose.Schema.Types.ObjectId,ref:"reply"}],
    isEdit : {type:Boolean, default:false},    
}, { timestamps: true });

module.exports = mongoose.model('review',reviewSchema);
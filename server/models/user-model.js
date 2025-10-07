const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    } ,
    role : {type:String, enum:['admin','teacher','student'], default:'student'} 
    ,
    verifyOtp: { type: String, default: '' },
    verifyOtpExpireAt: { type: Number, default: 0 }, // fixed typo
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: '' },
    resetOtpExpireAt: { type: Number, default: 0 }
});

module.exports = mongoose.model('user',userSchema);
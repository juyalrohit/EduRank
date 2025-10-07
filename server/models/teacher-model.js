const mongoose = require('mongoose');


const teacherSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'department' },
    position: String,
    picture: String,
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'review' }],
    avgRating: { type: Number, default: 0 }  // New field to store teacher's average rating
});


module.exports = mongoose.model('teacher',teacherSchema);
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  reply: {
    type: String,
    required: true,
    trim: true
  },
  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  }],
  unlike:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  }]
}, {
  timestamps: true 
});

module.exports = mongoose.model('reply', replySchema);

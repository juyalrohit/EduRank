const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI,{})
.then(()=>{
    console.log('connect to mongodb');
})
.catch((error)=>{
    console.error(error);
});

module.exports = mongoose.connection;


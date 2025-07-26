const express = require('express');
const path = require('path');
const cors = require('cors');
 require('dotenv').config();
const db = require('./config/mongodb-connection');
const userRouter = require('./routes/userRouter');
const teacherRouter = require('./routes/teacherRouter');
const departmentRouter  = require('./routes/departmentRouter');
const reviewRouter = require('./routes/reviewRouter');
const searchdataRouter = require('./routes/searchdataRouter');
const replyRouter = require('./routes/replyRouter')
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(cookieParser());

  
app.use(cors({origin: 'http://localhost:5173',credentials:true}))

app.use('/user',userRouter);
app.use('/teacher',teacherRouter);
app.use('/department',departmentRouter);
app.use('/review',reviewRouter);
app.use('/searchdata', searchdataRouter);

app.use('/reply',replyRouter)

app.get('/api',(req,res)=>{
    res.json({message:"we are connecting backend with frontend"});
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});
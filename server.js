const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRouter=require('./router/userRouter');
const langRouter=require('./router/langRouter');
const excerciseRouter=require('./router/excerciseRouter');
require('dotenv').config();
const app=express();


// middle ware here
app.use(express.json());
app.use(cors());

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONOGO_URL);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };


// app.get('/api/v1/user',(req,res)=>{
//   console.log("Hello ther");
//   res.json({message:"Home route"})
// })
app.use('/api/v1/lang',langRouter)
app.use('/api/v1/user',userRouter);
app.use('/api/v1/excercise',excerciseRouter);

const port=process.env.PORT || 6000;
app.listen(port,()=>{
    connect();
    console.log("server started",port);
})
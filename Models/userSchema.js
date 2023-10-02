const mongoose=require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        
    },
    languagePreferance:{
       type:String,
       
    },
    isAdmin:{
      type:Boolean,
      default:false,
    
},
    scores:[
     { 
      excerciseId:{type:mongoose.Schema.Types.ObjectId,
      ref:"Excercise",
      required:true,
      },
      name:{
        type:String,required:true,
      },
      difficulty:{
        type:String,required:true
      },
      
      score:{type:Number,required:true}
    }
    ]
   
  
  
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
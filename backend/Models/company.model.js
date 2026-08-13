import mongoose from "mongoose";


const companySchma=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
   description:{
    type:String,
  },
   website:{
    type:String,
  },
   location:{
    type:String,
  },  
   logo:{
    type:String,//url of logo
    required:true
  }, 
   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
},{timestamps:true})
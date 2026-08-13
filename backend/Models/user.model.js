import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],//enum is used when we want a user to choose something from given options e.g. role can be either student or recruiter nothing else
        required:true
    },
    profile:{
        bio:{
            type:String
        },
        skills:[
            {
              type:String  
            }],
        resume:{
               type:String//url for resume
        },
        resumeName:{
            type:String
        },
        company:{
            type:mongoose.Schema.Types.ObjectId,//relation is generated between company and user
            ref:'Company'
        },
        profilePhoto:{
            type:String,
            default:""
        }
    }
},{timestamps:true})

export const User=mongoose.model(User,userSchema)
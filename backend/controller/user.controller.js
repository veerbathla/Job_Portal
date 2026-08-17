import { User } from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNo, password, role } = req.body;
    if (!fullname || !email || !phoneNo || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10); //10 is the salt value here which is used to determine the length of hashed password

    await User.create({
      fullname,
      email,
      phoneNo,
      password: hashedpassword,
      role,
    });

    return res.status(200).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error registering user :", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      res.staus(400).json({
        message: "The user does not exist",
        success: false,
      });
    }
    const isPasswordmatches = await bcrypt.compare(password, user.password);
    if (!password) {
      res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }
    if (role != user.role) {
      res.status(400).json({
        message: "Account does notxexist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNo: user.phoneNo,
      role: user.role,
      profile: user.profile,
      token:token
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log("Error loggin in :", error);
  }
};


export const logout=async(req,res)=>{
    try{
       return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged out successfully",
        success:true
       })
    }
    catch(error){
        console.log("Error logging out:",error)
    }
}

export const updateProfile=async(req,res)=>{
    try{
       const { fullname, email, phoneNo,bio,skills } = req.body; 
       const file =req.file;
       

    //cloudinary


    let skillsArray;
    if(skills){
       skillsArray=skills.split(",")
    }
    
    const userId=req.id//middleware authentication
    let user=await User.findById(userId)
    if(!user)
    {
        return res.status(400).json({
         message:"User not found",
         success:false
        })
    }
    if(fullname)
    user.fullname=fullname
    if(email)
    user.email=email
    if(phoneNo)
    user.phoneNo=phoneNo
    if(bio)
    user.profile.bio=bio
    if(skillsArray)
    user.profile.skills=skillsArray

    //resume comes later here
    await user.save();

     user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNo: user.phoneNo,
      role: user.role,
      profile: user.profile,
    };
     
    return res.status(200).json({
        message:"Profile updated successfully",
        user,
        success:true
    })

    }
    catch(error){
        console.log("Error updating profile:",error)
    }
}
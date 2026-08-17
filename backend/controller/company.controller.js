import { Company } from "../Models/company.model.js"

export const registerCompany=async(req,res)=>{
 try{
  const {name}=req.body
  if(!name){
    return res.status(400).json({
        message:"Company name is required",
        success:false
    })
  }
  let company=await Company.findOne({name:name})
  if(company){
    return res.status(400).json({
        message:"Company already exists",
        success:false
    })
  }
  company=await Company.create({
    name:name,
    userId:req.id
  })
  return res.status(201).json({
    message:"Company registered successfully",
    success:true
  })
 }
 catch(error)
 {
    console.log("Error registering company",error)
 }
}




export const getCompany=async(req,res)=>{
    try{
     const userId=req.id;
     const companies=await Company.find({userId})
     if(!companies){
        res.status(400).json({
            message:"companies not found",
            success:false
        })
     }
     res.status(200).json({
        companies,
        success:true
     })
    }
    catch(error)
    {
     console.log("Error getting companies",error)
    }
}

export const getCompanyById=async(req,res)=>{
    try{
     const companyId=req.params.id
     const company=await Company.findById(companyId)
     if(!company){
        res.status(400).json({
            message:"company not found",
            success:false
        })
     }
     return status(200).json({
        message:"company found successfully",
        company,
        success:true
     })
    }
    catch(error){
        console.log(error)
    }
}


export const updateCompany=async(req,res)=>{
    try{
      const {name,description,website,location}=req.body;
      const file=req.file;
      //cloudinary


      const updateData= {name,description,website,location}

      const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
      if(!company){
        res.status(400).json({
            message:"company not found",
            success:false
        })
      }
      return res.status(200).json({
        message:"Company data updated successfully",
        success:true
      })
    }
    catch(error)
    {
     console.log("Error updating company",error)  
    }
}
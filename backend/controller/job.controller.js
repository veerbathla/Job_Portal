import { Job } from "../Models/job.model.js";

export const postJob=async(req,res)=>{
    try{
      const {title,description,requirements,salary,location,company,experience,jobType,openings,companyId}=req.body;
      const userId=req.id;

      if(!title||!description||!requirements||!salary||!location||!experience||!jobType||!openings||!companyId){
        res.status(400).json({
            message:"Missing details",
            success:false
        })
      }
      if(!userId){
        res.status(400).json({
            message:"user not authorized",
            success:false
        })
      }
      const job=await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        experience,
        jobType,
        openings,
        company:companyId,
        created_by:userId
      })
      res.status(200).json({
        message:"New job created successfully",
        job,
        success:true
      })
    }
    catch(err)
    {
        console.log("Error creating a job",err)
    }
}



export const getAllJob=async(req,res)=>{
    try{
     const keyword=req.query.keyword||"";
     const query={
        $or:[
            {title:{$regex:keyword,$options:"i"}},//i means case insensitive
            {description:{$regex:keyword,$options:"i"}}
        ]
     }
     const jobs=await Job.find(query);
     if(!jobs){
        res.status(404).json({
            message:"Job not found",
            success:false
        })
     }
     return res.status(200).json({
        jobs,
        success:true
     })
    }
    catch(error){
        console.log("Error getting jobs",error)
    }
}



export const getJobById=async(req,res)=>{
    try{
    const jobId=req.params.id;
    const job=await Job.findById(jobId);
    if(!job){
        res.status(404).json({
            message:"Job not found",
            success:false
        }) 
    }
    return res.status(200).json({
        job,
        success:true
    })
    }
    catch(error)
    {
        console.log("Failed to get jobs",error)
    }
}

//recruiter ne kitni jobs create ki hai
export const getJobsByRecruiter=async(req,res)=>{
    try{
     const adminId=req.id;
     const jobs=await Job.find({created_by:adminId})

     if(!jobs){
        res.status(404).json({
            message:"Job not found",
            success:false
        }) 
    }
    return res.status(200).json({
        jobs,
        success:true
    })
    }
    catch(error){
        console.log("failed to load jobs",error)
    }
}
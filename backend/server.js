import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./Database/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});


const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))// HTML form se aane wale form-data ko parse karke req.body me readable object banata hai
//extended: true → complex/nested form data ko properly JavaScript object mein convert karne deta hai.
app.use(cookieParser());//cookieParser() → incoming cookies ko parse karke req.cookies mein readable object bana deta hai.


//cors
const corsOption={
    origin:'https://localhost:5173',//vite default port(frontend)
    credentials:true// Cross-origin requests me cookies ko send/receive karne allow karta hai
}
app.use(cors(corsOption))

const PORT=process.env.PORT ||3000

//api
app.use("/api/user",userRoute)

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on ${PORT}`)
})

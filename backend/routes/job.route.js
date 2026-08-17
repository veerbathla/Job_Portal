import express from "express";
import { getAllJob, getJobById, getJobsByRecruiter, postJob } from "../controller/job.controller.js";
import isAuthenticated from "../Middleware/isAuthenticated.js";
const router=express.Router();


router.route("/postjob").post(isAuthenticated,postJob);
router.route("/get").post(isAuthenticated,getAllJob);
router.route("/getadminjobs").post(isAuthenticated,getJobsByRecruiter);
router.route("/get/:id").post(isAuthenticated,getJobById);

export default router;
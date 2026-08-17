import express from "express"
import isAuthenticated from "../Middleware/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";



const router=express.Router();
router.route("/register").post(registerCompany)
router.route("/get").post(getCompany)
router.route("/get/:id").post(getCompanyById)
router.route("/update/:id").post(isAuthenticated,updateCompany)

export default router;
import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Application } from "../models/applicationSchema.js";

export const postApplication = catchAsyncErrors(async(req, res, next)=> {
    const {id} = req.params;
    const {name, email, phone, address, coverLetter} = req.body;
    if (!name || !email || !phone || !address || !coverLetter){
         return next(new ErrorHandler("All fields must be filled", 400));
    }
    const jobSeekerInfo = {
        
    }
});
export const employerGetAllApplication = catchAsyncErrors(async(req, res, next)=> {});
export const jobSeekerGetAllApplication = catchAsyncErrors(async(req, res, next)=> {});
export const deleteApplication = catchAsyncErrors(async(req, res, next)=> {});

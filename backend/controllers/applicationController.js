import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import { Application } from "../models/applicationSchema.js";

export const postApplication = catchAsyncErrors(async(req, res, next)=> {});
export const employerGetAllApplication = catchAsyncErrors(async(req, res, next)=> {});
export const jobSeekerAllApplication = catchAsyncErrors(async(req, res, next)=> {});
export const deleteApplication = catchAsyncErrors(async(req, res, next)=> {});

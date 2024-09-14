import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {User} from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";


export const postJob = catchAsyncErrors(async (req, res, next) => {
    const {title, jobType, location, companyName,  introduction, responsibilities, qualifications, offers,  salary, hiringMultipleCandidates,  personalWebsite, jobNiche, newsLetterSend   } = req.body;
  
})
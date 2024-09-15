import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {User} from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";


export const postJob = catchAsyncErrors(async (req, res, next) => {
    const {title, jobType, location, companyName,  introduction, responsibilities, qualifications, offers,  salary, hiringMultipleCandidates,  personalWebsiteTitle, personalWebsiteUrl, jobNiche }   = req.body;
       if (!title || !jobType || !location || !companyName || !introduction || !responsibilities || !qualifications || !salary || !jobNiche ){
        return next(new ErrorHandler ("Please fill out the required fields", 400))
       };
       if ((personalWebsiteTitle && !personalWebsiteUrl) || (!personalWebsiteTitle && personalWebsiteUrl)) {
            return next(new ErrorHandler("Provide both website url and title or leave both blank", 400))
       }
const postedBy = req.user._id;
const job = await Job.create({
    title, 
    jobType, 
    location, 
    companyName,  
    introduction, 
    responsibilities, 
    qualifications, 
    offers,  
    salary, 
    hiringMultipleCandidates,  
    personalWebsite: {
        title: personalWebsiteTitle, 
        url: personalWebsiteUrl
    },
    jobNiche,
    postedBy
})
res.status(201).json({
    success: true,
    messgage: "Job posted successfully",
    job
})

})
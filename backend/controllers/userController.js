import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {User} from "../models/userSchema.js"

export const register = catchAsyncErrors(async(req, res, next) => {
    try {
        const {
            name, 
            email, 
            phone, 
            address, 
            password, 
            role, 
            firstNiche, 
            secondNiche, 
            thirdNiche, coverLetter } = req.body;

        if (!name || !email || !phone || !address || !password || !role){
            return next(new ErrorHandler("All fields are required", 400))
        }
        if (role === "Job Seeker" && (!firstNiche || secondNiche || thirdNiche )) {
            return next(new ErrorHandler("All fields are required", 400))

        }
    } catch (error) {

    }
})
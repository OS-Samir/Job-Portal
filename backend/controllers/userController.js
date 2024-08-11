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
            thirdNiche, 
            coverLetter } = req.body;

        if (!name || !email || !phone || !address || !password || !role){
            return next(new ErrorHandler("All fields are required", 400))
        }
        if (role === "Job Seeker" && (!firstNiche || secondNiche || thirdNiche )) {
            return next(new ErrorHandler("Please provide your preferred job niches", 400))

        }
        const exsitingUser = await User.find({email});
        if(exsitingUser) {
            return next(new ErrorHandler("Email is already registered", 400))

        }
        const userData  = {
            name, 
            email, 
            phone, 
            address, 
            password, 
            role, 
            firstNiche, 
            secondNiche, 
            thirdNiche, 
            coverLetter 
        }

    } catch (error) {

    }
})
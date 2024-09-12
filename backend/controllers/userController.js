import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import {User} from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";
import {sendToken} from "../utils/jwtToken.js"

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
        if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche )) {
            return next(new ErrorHandler("Please provide your preferred job niches", 400))

        }
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return next(new ErrorHandler("Email is already registered", 400))

        }
        const userData  = {
            name, 
            email, 
            phone, 
            address, 
            password, 
            role, 
            niches: {
            firstNiche, 
            secondNiche, 
            thirdNiche, 
            },
            coverLetter,  
        };
        if(req.files && req.files.resume) {
            const {resume} = req.files;
            if(resume) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, 
                        {folder: "Job_Seekers_Resume"}
                        )
                        if(!cloudinaryResponse || cloudinaryResponse.error) {
                            return next (new ErrorHandler("Failed to upload resume to cloud", 500));
                        }
                        userData.resume = {
                            public_id : cloudinaryResponse.public_id,
                            url: cloudinaryResponse.secure_url
                        };
                        
                } catch(error) { 
                        return next (new ErrorHandler(`Failed to upload resume to cloud${error.message}`, 500));
                }
            }
        }
        
        const user = await User.create(userData);
        sendToken(user, 201, res, "User created successfully")
     
    
    } catch (error) {
        next(error);
    }
})


export const login = catchAsyncErrors(async(req, res, next) => {
    const {role, email, password} = req.body; 
    if (!role || !email || !password) {  return  next(new ErrorHandler("Every field should be filled", 400)
)
};

const user = await User.findOne({email}).select("+password");
if (!user) {
    return next (new ErrorHandler("Either password or email is incorrect", 400))
}
})
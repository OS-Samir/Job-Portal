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
const isPasswordMatch = await user.comparePassword(password);
if (!isPasswordMatch) {
    return next(new ErrorHandler("Either password or email is incorrect", 400))
}
if(user.role !== role) {
    return next(new ErrorHandler("Oops! user role doesn't match", 400))
}
sendToken(user, 200, res, "User logged in successfully")
})

export const logout = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        sucess: true,
        message: "User logged out successfully"
    })
})


export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        sucess: true,
        user,
    })
});

export const updateProfile = catchAsyncErrors(async(req, res, next) => {


   const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    coverLetter: req.body.coverLetter,
    niches: {
        firstNiche: req.body.firstNiche,
        secondNiche: req.body.secondNiche, 
        thirdNiche: req.body.thirdNiche
    }
   }

   const {firstNiche, secondNiche, thirdNiche} = newUserData.niches;

   if (req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche) ) {
    return next (new ErrorHandler("Please provide your all preferred job niches", 400))
   };

   if (req.files) {
    const {resume} = req.files;
    if (resume) {
        const currentResumeId = req.user.resume.public_id;
        if (currentResumeId) {
            await cloudinary.uploader.destroy(currentResumeId)
    }
        const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: "JOb_Seekers_Resume"
        })

        newUserData.resume = {
            public_id: newResume.public_id,
            url: newResume.secure_url
        };
   }
}
   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
   });
   res.status(200).json({
    success: true,
    user,
    message: "profile updated successfully"
   })




})



import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";

import {v2 as cloudinary} from "cloudinary";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";



export const postApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;
    if (!name || !email || !phone || !address || !coverLetter) {
      return next(new ErrorHandler("All fields are required.", 400));
    }
    const jobSeekerInfo = {
      _id: req.user._id,
      name,
      email,
      phone,
      address,
      coverLetter,
      role: "Job Seeker",
    };
    const jobDetails = await Job.findById(id);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    const isAlreadyApplied = await Application.findOne({
      "jobInfo.jobId": id,
      "jobSeekerInfo.id": req.user._id,
    });
    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have already applied for this job.", 400)
      );
    }
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          resume.tempFilePath,
          {
            folder: "Job_Seekers_Resume",
          }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          return next(
            new ErrorHandler("Failed to upload resume to cloudinary.", 500)
          );
        }
        jobSeekerInfo.resume = {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        };
      } catch (error) {
        return next(new ErrorHandler("Failed to upload resume", 500));
      }
    } else {
      if (req.user && !req.user.resume.url) {
        return next(new ErrorHandler("Please upload your resume.", 400));
      }
      jobSeekerInfo.resume = {
        public_id: req.user && req.user.resume.public_id,
        url: req.user && req.user.resume.url,
      };
    }
    const employerInfo = {
      id: jobDetails.postedBy,
      role: "Employer",
    };
    const jobInfo = {
      jobId: id,
      jobTitle: jobDetails.title,
    };
    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });
    res.status(201).json({
      success: true,
      message: "Application submitted.",
      application,
    });
  });
  


export const employerGetAllApplication = catchAsyncErrors(async(req, res, next)=> {});
export const jobSeekerGetAllApplication = catchAsyncErrors(async(req, res, next)=> {});
export const deleteApplication = catchAsyncErrors(async(req, res, next)=> {});
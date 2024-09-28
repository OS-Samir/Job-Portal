import cron from 'node-cron';
import {Job} from "../models/jobSchema.js";
import {User} from "../models/userSchema.js";
import { sendEmail } from '../utils/sendEmail.js';

export const newLetterCron = () => {
cron.schedule("*/1 * * * *", async () => {
    const jobs = await Job.find({newsLettersSent: false});
    for (const job of jobs) {
        try {
            const filteredUsers = await User.find({
                $or: [
                    {"niches: firstNiche": job.jobNiche},
                    {"niches: secondNiche": job.jobNiche},
                    {"niches: thirdNiche": job.jobNiche},

                ]
            })
            for (const user of filteredUsers) {
                const subject = `Job Alert: ${job.title} in ${job.jobNiche} Available now`;
                const message = ``;
                sendEmail({
                    email: user.email,
                    subject,
                    message
                })
            }
            job.newsLettersSent = true;
            await job.save();
        } catch (error) {
            console.log("Error in node cron catch block");
            return next (console.error(error.message || "Some error occured in cron"))
        }
    }
} )
}
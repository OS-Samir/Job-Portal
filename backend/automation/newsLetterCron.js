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
        } catch (error) {

        }
    }
} )
}
import cron from 'node-cron';
import {Job} from "../models/jobSchema.js";
import {User} from "../models/userSchema.js";
import { sendEmail } from '../utils/sendEmail.js';

export const newLetterCron = () => {
cron.schedule("*/1 * * * *", async () => {

} )
}
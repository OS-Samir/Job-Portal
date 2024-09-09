import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_PORTAL_WITH_AUTOMATION"
    }).then(() => {
        console.log("connected to database");
    }).catch(error=> {
        console.log(`error connecting to database: ${error}`);
    })
}
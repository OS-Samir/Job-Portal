import cors from "cors";
import express from "express"; // express package imported
import { config } from "dotenv";// dotenv imported


const app = express(); // instance of express
config({ path: "./config/config.env" }); // Load the environment variables

app.use(cors({
    origin: [""]
}))

export default app;

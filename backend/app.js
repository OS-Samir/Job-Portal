import cors from "cors";
import express from "express"; // express package imported
import { config } from "dotenv";// dotenv imported
import cookieParser from "cookie-parser";
import {connection} from "./database/connection.js";
import { errorMiddleware } from "./database/middleware/error.js";


const app = express(); // instance of express
config({ path: "./config/config.env" }); // Load the environment variables

app.use(cors({
    origin: ["process.env.FRONTEND_URL"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connection();

app.use(errorMiddleware)

export default app;

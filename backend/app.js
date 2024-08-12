import cors from "cors";
import express from "express"; // express package imported
import { config } from "dotenv";// dotenv imported
import cookieParser from "cookie-parser";
import {connection} from "./database/connection.js";
import { errorMiddleware } from "./middleware/error.js";
import fileUpload from 'express-fileupload';
import userRouter from "./routes/userRouter.js";



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

app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
})
);
app.use("/api/v1/user", userRouter);
connection();

app.use(errorMiddleware)

export default app;

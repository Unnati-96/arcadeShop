import express from "express";
import dotenv from "dotenv";
import { mongoDB } from "./config/mongo.js";
// import signupRouter from "./routes/user.js";
import adduserRouter from "./routes/user.js";
import getuserRouter from "./routes/user.js";
import updateuserRouter from "./routes/user.js";
import deluserRouter from "./routes/user.js";
import searchuserRouter from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
await mongoDB();

// app.use("/arcade/authuser",signupRouter);
app.use("/arcade/user",adduserRouter);
app.use("/arcade/user",getuserRouter);
app.use("/arcade/user",updateuserRouter);
app.use("/arcade/user",deluserRouter);
app.use("/arcade/user",searchuserRouter);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!!";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
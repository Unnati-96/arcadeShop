import express from "express";
import dotenv from "dotenv";
import { mongoDB } from "./config/mongo.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
await mongoDB();

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const mongoDB = async ()=>{
    try {
await mongoose.connect(process.env.connectionURL);
console.log("Connected to MongoDB!!");
    } catch (error) {
        console.log("Unable to connect!",error);
    }
}
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import dotenv from "dotenv";
dotenv.config();
export const verifyUser = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token)
    {
       return next(errorHandler(401,"Forbidden!!"))
    }
     jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err)
        {
            return next(errorHandler(403,"Unauthorized!!"));
        }
      //   req.user = user;
        next();
     })
}
import user from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import dotenv from "dotenv";


dotenv.config();

export const signupUser = async (req,res,next)=>{
    const {name,email,phoneNo,password} = req.body;
    const hashedPassword =  bcryptjs.hashSync(password,10);
    const newUser = new user({name,email,phoneNo,password:hashedPassword});

    try {
        await newUser.save();
        res.status(201).json("User created Successfully!!")
    } catch (error) {
        next(error);
    }

}

export const signinUser = async (req,res,next) =>{
    const {email,password,role} = req.body;
    try {
        const validUser = await user.findOne({email});
        if(!validUser)
        {
          return next(errorHandler(404,"User not found!!"));    
        }

        if(role=== "Guest")
        {  
            const validPassword = bcryptjs.compareSync(password,validUser.password);
            if(!validPassword)
            {
               return next(errorHandler(401,"Wrong Credentials!!"));
            }
        }
        
        if(role !== validUser.role)
        {
            return next(errorHandler(404,"Unauthorised,SignIn as Guest!!"));
        }
     const token = jwt.sign({id:validUser._id},process.env.SECRET_KEY);
     const {password:pass,...rest} = validUser._doc;
    return res.cookie("access_token",token,{httpOnly:true,secure:true}).status(201).json(rest);
  
    } catch (error) {
        next(error);
    }
}

export const signoutUser = async (req,res,next)=>{
    try {
        res.clearCookie("access_token");
        res.status(200).json("User logged out successfully!!");
    } catch (error) {
      next(error);  
    }
}
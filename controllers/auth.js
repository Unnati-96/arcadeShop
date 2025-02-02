import user from "../models/user.js";
import bcryptjs from "bcryptjs";



export const signupUser = async (req,res,next)=>{
    const {name,email,phoneNo,role,password} = req.body;
    const hashedPassword =  bcryptjs.hashSync(password,10);
    const newUser = new user({name,email,phoneNo,role,password:hashedPassword});

    try {
        await newUser.save();
        res.status(201).json("User created Successfully!!")
    } catch (error) {
        next(error);
    }

}
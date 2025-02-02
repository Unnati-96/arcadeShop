import user from "../models/user.js";
// import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

// export const signupUser = async (req,res,next)=>{
//     const {name,email,phoneNo,role,password} = req.body;
//     const hashedPassword =  bcryptjs.hashSync(password,10);
//     const newUser = new user({name,email,phoneNo,role,password:hashedPassword});

//     try {
//         await newUser.save();
//         res.status(201).json("User created Successfully!!")
//     } catch (error) {
//         next(error);
//     }

// }


export const addUser =  async (req,res,next)=>{
    try {
    const data = await user.create(req.body);
    console.log(data);
    res.status(201).json("User created successfully!!");    
    } catch (error) {
       next(error); 
    }
}

export const getUser = async (req,res,next)=>{ 
    try {
       const data = await user.find({});
       console.log(data);
       res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req,res,next)=>{
    const id = req.params.id;
    try {
        const data =await user.findByIdAndUpdate({_id:id},{
            name:req.body.name,
            email:req.body.email,
            phoneNo:req.body.phoneNo,
            role:req.body.role,
            password:req.body.password
        });
        if(!data)
        {
            return next(errorHandler(404,"User not found!!"))
        }
        console.log(data);
        return res.status(200).json({message:"User updated successfully!!",updatedUser:data});
    } catch (error) {
      next(error);  
    }
}

export const delUser = async (req,res,next)=>{
    const id = req.params.id;
    try {
        const data= await user.findByIdAndDelete({_id:id});
        if(!data)
        {
           return next(errorHandler(404,"User not found!!"));
        }
        console.log(data);
        res.status(200).json("User deleted successfully!!");
    } catch (error) {
        next(error);
    }
}

export const searchUser = async (req,res,next)=>{
    const {name,email,phoneNo} = req.query;
    const filter = {};
    if(name && name.trim() !== "")
    {
        filter.name = name;
    }
    
    if(email && email.trim() !== "")
    {

        filter.email = email;
    }
    
    if(phoneNo && phoneNo.trim() !== "")
    {
        const num = Number(phoneNo);
        if(isNaN(num))
        {
            return next(errorHandler(400,"Invalid Phone Number!!"))
        }
        filter.phoneNo= num;
    }
   
    if(Object.keys(filter).length === 0)
    {
    return next(errorHandler(400,"Bad Request,please provide user information!"))
    }
    try {
     const data = await user.find(filter);
     if(data.length ===0)
     {
        return next(errorHandler(404,"User does not exist!!"));
     }
       res.status(200).json(data);
    } catch (error) {
        next(error);
    }

}
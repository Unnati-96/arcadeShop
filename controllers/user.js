import user from "../models/user.js";
import { errorHandler } from "../utils/error.js";



export const addUser =  async (req,res,next)=>{
    try {
    const data = await user.create(req.body);
    console.log(data);
    res.status(201).json("User created successfully!!");    
    } catch (error) {
       next(error); 
    }
}

// export const getUser = async (req,res,next)=>{ 
//     try {
//        const data = await user.find({});
//        console.log(data);
//        res.status(200).json(data);
//     } catch (error) {
//         next(error);
//     }
// }

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
    let filter = {};
    if(name && name.trim() !== "")
    {
        filter.name = {$regex:name,$options:"i"};
    }
    
    if(email && email.trim() !== "")
    {

        filter.email = {$regex:email,$options:"i"};
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
   
    // if(Object.keys(filter).length === 0)
    // {
    // return next(errorHandler(400,"Bad Request,please provide user information!"))
    // }
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
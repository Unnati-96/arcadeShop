import mongoose from "mongoose";
import device from "../models/device.js";
import { errorHandler } from "../utils/error.js";

export const addDevice = async (req,res,next)=>{
    try {
    const data = await device.create(req.body);
        console.log(data);
        return res.status(201).json("Device added successfully!!")
    } catch (error) {
        next(error);
    }
}

export const getDevices = async (req,res,next)=>{
    try {
         const data = await device.find({});
         res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
}

export const updateDevice = async (req,res,next)=>{
  const id = req.params.id;
  try {
  const data = await device.findByIdAndUpdate({_id:id},{name:req.body.name,description:req.body.description,pricePrHr:req.body.pricePrHr,status:req.body.status},{new:true});
  if(!data)
  {
    return next(errorHandler(404,"Device not found!!"))
  }
  console.log(data);
   return res.status(200).json("Device updated successfully!!")
  } catch (error) {
    next(error);
  }

}

export const delDevice = async (req,res,next)=>{
    const id = req.params.id;
    try {
    const data = await device.findByIdAndDelete({_id:id});
        if(!data)
        {
         return  next(errorHandler(404,"Device not found!!"));
        }
        console.log(data);
        return res.status(200).json("Device deleted successfully!!")
    } catch (error) {
        next(error);
    }
}

export const searchDevice = async (req,res,next)=>{
    const {name,id} = req.query;
    let filter = {};
    if(name && name.trim() !== "")
    {
        filter.name= {$regex:name,$options:"i"}
    }
    if(id && id.trim() !== "")
    {
        if(mongoose.Types.ObjectId.isValid(id))
        {
            filter._id = id;
        }
        else{
            return next(errorHandler(200,"Invalid Id!!"));
        }
    }
    if(Object.keys(filter).length === 0)
    {
        return next(errorHandler(400,"Please apply the filter!!"));
    }
    try {
       const data = await device.find(filter);
       if(data.length ===0)
        {
          return next(errorHandler(404,"Device not found!!"));
        } 
       return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
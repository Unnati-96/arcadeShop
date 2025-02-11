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

// export const getDevices = async (req,res,next)=>{
//     try {
//          const data = await device.find({});
//       return res.status(200).json(data); 
//     } catch (error) {
//         next(error);
//     }
// }

export const updateDevice = async (req,res,next)=>{
  const id = req.params.id;
  try {
    console.log(req.body);
  const data = await device.findByIdAndUpdate({_id:id},{name:req.body.name,description:req.body.description,pricePerHour:req.body.pricePerHour,status:req.body.status},{new:true});
  if(!data)
  {
    return next(errorHandler(404,"Device not found!!"))
  }
  console.log(data);
   return res.status(200).json({message:"Device updated successfully!!",details:data});
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
    const {deviceType,systemId} = req.query;
    let filter = {};
    if(deviceType && deviceType.trim() !== "")
    {
        filter.deviceType= {$regex:deviceType,$options:"i"}
    }
    if(systemId&& systemId.trim() !== "")
    {
       
            filter.systemId = systemId;
    }
    try {
       const data = await device.find(filter);
       if(Object.keys(filter).length === 0)
        {
            return res.status(200).json(data);
        }
       if(data.length ===0)
        {
          return next(errorHandler(404,"Device not found!!"));
        } 
       return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
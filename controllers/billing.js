import mongoose from "mongoose";
import Bill from "../models/billing.js";
import booking from "../models/booking.js";
import device from "../models/device.js";
import { errorHandler } from "../utils/error.js";
import user from "../models/user.js";

export const generateBill = async (req,res,next)=>{
const bookingId =req.body.bookingId;
const role= req.user.role;
try {
   const validBooking = await booking.findById(bookingId);
//    const issuer = await user.findById();
   const billedBy = role;
console.log(role);
   const tim= validBooking.entryTime.toISOString();
   const date =tim.split("T")[0];
   const duration = (validBooking.exitTime-validBooking.entryTime)/3600000;
   const systemId= validBooking.systemId;
   const system = await device.findOne({systemId});
   const rate = system.pricePerHour;
   const price = rate * duration;
   const groupName = validBooking.groupName;
   const newBill = new Bill({bookingId,systemId,price,date,billedBy,rate,duration,groupName});
   const savedBill = await newBill.save();
   console.log(savedBill,savedBill._id);
   return res.status(200).json({"BillId":savedBill._id,"Details":savedBill});
} catch (error) {
    next(error);
}
}

export const getBill = async (req,res,next)=>{
    const {billId,bookingId} = req.query;
    let filter = {};
    if(billId && billId.trim() !=="")
    {
        if(mongoose.Types.ObjectId.isValid(billId))
        {
            filter._id= billId;
        }
        else
        {
            return next(errorHandler(404,"Invalid BillId!!"));
        }
    }
 if(bookingId && bookingId.trim() !== "")
 {
    if(mongoose.Types.ObjectId.isValid(bookingId))
    {
        filter.bookingId = bookingId;
    }
    else 
    {
        return next(errorHandler(400,"Invalid BookingId!!"));
    }
}

    try {
   const data = await Bill.find(filter);
    if(Object.keys(filter).length ===0)
    {
        return res.status(200).json(data);
    }
    if(data.length ===0)
    {
        return next(errorHandler(404,"Bill Not Found!!"));
    }
       return res.status(200).json(data); 
    } catch (error) {
        next(error);
    }
}
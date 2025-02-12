// import mongoose from "mongoose";
// import Bill from "../models/billing.js";
// import booking from "../models/booking.js";
// import device from "../models/device.js";
// import { errorHandler } from "../utils/error.js";
// import user from "../models/user.js";

// export const generateBill1 = async (req,res,next)=>{
// const bookingId =req.body.bookingId;
// const role= req.user.role;
// try {
//    const validBooking = await booking.findById(bookingId);
// //    const issuer = await user.findById();
//    const billedBy = role;
// console.log(role);
//    const tim= validBooking.entryTime.toISOString();
//    const date =tim.split("T")[0];
//    const duration = (validBooking.exitTime-validBooking.entryTime)/3600000;
//    const systemId= validBooking.systemId;
//    const system = await device.findOne({systemId});
//    const rate = system.pricePerHour;
//    const price = rate * duration;
//    const groupName = validBooking.groupName;
//    const newBill = new Bill({bookingId,systemId,price,date,billedBy,rate,duration,groupName});
//    const savedBill = await newBill.save();
//    console.log(savedBill,savedBill._id);
//    return res.status(200).json({"BillId":savedBill._id,"Details":savedBill});
// } catch (error) {
//     next(error);
// }
// }

// export const generateBill = async (req,res,next)=>{
//     const bookingId =req.body.bookingId;
//     const role= req.user.role;
//     try {
//        const validBooking = await booking.findById(bookingId);
//        const newBill = new Bill(req.body);
//        const savedBill = await newBill.save();
//        console.log(savedBill,savedBill._id);
//         console.log(req.body);
//        return res.status(200).json({"BillId":savedBill._id,"Details":savedBill});
//     } catch (error) {
//         next(error);
//     }
//     }


// export const getBill = async (req,res,next)=>{
//     const {billId,bookingId} = req.query;
//     let filter = {};
//     if(billId && billId.trim() !=="")
//     {
//         if(mongoose.Types.ObjectId.isValid(billId))
//         {
//             filter._id= billId;
//         }
//         else
//         {
//             return next(errorHandler(404,"Invalid BillId!!"));
//         }
//     }
//  if(bookingId && bookingId.trim() !== "")
//  {
//     if(mongoose.Types.ObjectId.isValid(bookingId))
//     {
//         filter.bookingId = bookingId;
//     }
//     else 
//     {
//         return next(errorHandler(400,"Invalid BookingId!!"));
//     }
// }

//     try {
//    const data = await Bill.find(filter);
//    console.log("Data:" , data);
//     if(Object.keys(filter).length ===0)
//     {
//         return res.status(200).json(data);
//     }
//     if(data.length ===0)
//     {
//         return next(errorHandler(404,"Bill Not Found!!"));
//     }
//        return res.status(200).json(data); 
//     } catch (error) {
//         next(error);
//     }
// }





import mongoose from "mongoose";
import Bill from "../models/billing.js";
import booking from "../models/booking.js";
import device from "../models/device.js";
import { errorHandler } from "../utils/error.js";
// import user from "../models/user.js";

// import user from "../models/user.js";
export const generateBill = async (req,res,next)=>{
const bookingId =req.body.bookingId;
const role= req.user.role;
try {
//    const validBooking = await booking.findById(bookingId);
//    const billedBy = role;
// console.log(role);


const validBooking = await booking.findById(bookingId).populate({
    path: "users",  // Populate the 'users' field with the user model data
    select: "name email"  // Only select the 'name' and 'email' fields of the users
  });
  const billedBy = role;
    console.log(role);


//    const validBooking = await booking.findById(bookingId);
//    const billedBy = role;
// console.log(role);
const validBooking = await booking.findById(bookingId).populate({
    path: "users",  // Populate the 'users' field with the user model data
    select: "name email"  // Only select the 'name' and 'email' fields of the users
  });
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

   const newBill = new Bill({
    bookingId,
    systemId,
    price,
    date,
    billedBy,
    rate,
    duration,
    groupName,
    users: validBooking.users  // Store user details in the bill if needed
  });


//    const newBill = new Bill({bookingId,systemId,price,date,billedBy,rate,duration,groupName});
   const newBill = new Bill({
    bookingId,
    systemId,
    price,
    date,
    billedBy,
    rate,
    duration,
    groupName,
    users: validBooking.users  // Store user details in the bill if needed
  });
//    const newBill = new Bill({bookingId,systemId,price,date,billedBy,rate,duration,groupName});
   const savedBill = await newBill.save();
   console.log(savedBill,savedBill._id);
   return res.status(200).json({"BillId":savedBill._id,  "Details": {
    ...savedBill.toObject(),
    users: validBooking.users  // Explicitly include users in the response
  }});
   return res.status(200).json({"BillId":savedBill._id,  "Details": {
    ...savedBill.toObject(),
    users: validBooking.users  // Explicitly include users in the response
  }});
} catch (error) {
    next(error);
}
}





export const getBill = async (req, res, next) => {
    const { billId, bookingId, users } = req.query;
export const getBill = async (req, res, next) => {
    const { billId, bookingId, users } = req.query;
    let filter = {};
  
    // Check for valid billId in the query string
    if (billId && billId.trim() !== "") {
      if (mongoose.Types.ObjectId.isValid(billId)) {
        filter._id = billId;
      } else {
        return next(errorHandler(404, "Invalid BillId!!"));
      }
    }
  
    // Check for valid bookingId in the query string
    if (bookingId && bookingId.trim() !== "") {
      if (mongoose.Types.ObjectId.isValid(bookingId)) {
    // Check for valid billId in the query string
    if (billId && billId.trim() !== "") {
      if (mongoose.Types.ObjectId.isValid(billId)) {
        filter._id = billId;
      } else {
        return next(errorHandler(404, "Invalid BillId!!"));
      }
    }
    // Check for valid bookingId in the query string
    if (bookingId && bookingId.trim() !== "") {
      if (mongoose.Types.ObjectId.isValid(bookingId)) {
        filter.bookingId = bookingId;
      } else {
        return next(errorHandler(400, "Invalid BookingId!!"));
      }
    }
  
    // Check for users query and filter by users' name
    if (users && users.trim() !== "") {
      filter["users.name"] = { $regex: users, $options: "i" }; // Case-insensitive search
    }
  
      } else {
        return next(errorHandler(400, "Invalid BookingId!!"));
      }
    }
    // Check for users query and filter by users' name
    if (users && users.trim() !== "") {
      filter["users.name"] = { $regex: users, $options: "i" }; // Case-insensitive search
    }
    try {
      const data = await Bill.find(filter).populate({
        path: "users", // Populate the 'users' field with the user model data
        select: "name email" // Select only 'name' and 'email' of the users
      });
  
      // If no filters, return all bills
      if (Object.keys(filter).length === 0) {
      const data = await Bill.find(filter).populate({
        path: "users", // Populate the 'users' field with the user model data
        select: "name email" // Select only 'name' and 'email' of the users
      });
      // If no filters, return all bills
      if (Object.keys(filter).length === 0) {
        return res.status(200).json(data);
      }
  
      // If no data is found
      if (data.length === 0) {
        return next(errorHandler(404, "Bill Not Found!!"));
      }
  
      return res.status(200).json(data); // Return the filtered bills
      }
      // If no data is found
      if (data.length === 0) {
        return next(errorHandler(404, "Bill Not Found!!"));
      }
      console.log("Data: ", data)
      return res.status(200).json(data); // Return the filtered bills
    } catch (error) {
      next(error);
      next(error);
    }
  };
  


  };
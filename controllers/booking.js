import mongoose from "mongoose";
import booking from "../models/booking.js";
import device from "../models/device.js";
import { errorHandler } from "../utils/error.js";

export const createBooking = async (req, res, next) => {
  const { groupName, systemId, users, entryTime, exitTime } = req.body;

  const validDevice = await device.findOne({ systemId });
  if (!validDevice) {
    return next(errorHandler(404, "Device not found!!"));
  }

  if (!validDevice.isAvailable) {
    return next(errorHandler(400, "Device already Booked!!"));
  }

  const overlappingBookings = await booking.find({
    systemId,
    $or: [
      { entryTime: { $lte: req.body.exitTime }, exitTime: { $gte: req.body.entryTime } }
    ]
  });

  if (overlappingBookings.length > 0) {
    return next(errorHandler(400, "Device is already booked for this time slot"));
  }


  const multipledevice = await booking.find({
    users: { $in: req.body.users },
    $or: [
      { entryTime: { $lte: req.body.exitTime }, exitTime: { $gte: req.body.entryTime } }
    ]
  });

  if (multipledevice.length > 0) {
    return next(errorHandler(400, "One group can book one device at a time!!"));
  }

  const newBooking = new booking({ groupName, systemId, users, entryTime, exitTime });

  try {
    const savedBooking = await newBooking.save();

    const st = new Date(req.body.entryTime);
    const end = new Date(req.body.exitTime);
    const duration = end - st; // Duration in milliseconds

    async function updateDeviceStatus() {
    
      await device.updateOne({ systemId }, { $set: { isAvailable: false } });
      console.log(`Device ${systemId} booked and status updated to unavailable.`);

    
      setTimeout(async () => {
        await device.updateOne({ systemId }, { $set: { isAvailable: true } });
        console.log(`Device ${systemId} is now available.`);
      }, duration);
    }

   
    const entryTimeDiff = st.getTime() - new Date().getTime();
    setTimeout(updateDeviceStatus, entryTimeDiff); 

    return res.status(201).json({ message: "Booking created successfully!!", BookingId: savedBooking._id });
  } catch (error) {
    next(error);
  }
};


export const bookingHistory =  async (req,res,next)=>{
    const {systemId,users,date} = req.query;
    try {
    let filter ={};
        if(systemId && systemId.trim() !== "")
        {
            filter.systemId= systemId;
        }
        if(users && users !== "")
        {
            if(mongoose.Types.ObjectId.isValid(users))
            {
                filter.users=users;

            }
            else{
                next(errorHandler(400,"Invalid Id format!!"))
            }
        }
        if(date && date.trim() !== "")
        {
              // If a date is provided, calculate the start and end of the day in UTC
       
            const searchDate = new Date(date);
            const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));  // 00:00:00 UTC of the given date
            const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));  // 23:59:59.999 UTC of the given date

            // Add date range filter to the query
            filter.$or = [
                { entryTime: { $gte: startOfDay, $lte: endOfDay } },
                { exitTime: { $gte: startOfDay, $lte: endOfDay } }
            ];
        }
        const data = await booking.find(filter);
        if(Object.keys(filter).length ===0)
        {
             return res.status(200).json(data);
        }
        if(data.length===0)
        {
            return next(errorHandler(404,"Booking not found!!"));
        }

    return res.status(200).json(data);

    } catch (error) {
        next(error);
    }

}
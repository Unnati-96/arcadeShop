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

  // if (!validDevice.isAvailable) {
  //   return next(errorHandler(400, "Device already Booked!!"));
  // }

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

    async function updateDeviceStatus() {
      const deviceStatus = await device.findOne({ systemId });
    
      if (deviceStatus.isAvailable) {
        await device.updateOne({ systemId }, { $set: { isAvailable: false } });
        console.log(`Device ${systemId} booked and status updated to unavailable.`);
      }
    
      const duration = end - st; // Duration in milliseconds
    
    
      setTimeout(async () => {
        const deviceStatusAfterTimeout = await device.findOne({ systemId });
        
        
        if (!deviceStatusAfterTimeout.isAvailable) {
          await device.updateOne({ systemId }, { $set: { isAvailable: true } });
          console.log(`Device ${systemId} is now available.`);
        }
      }, duration);
    }
    const entryTimeDiff = st.getTime() - new Date().getTime();
    setTimeout(updateDeviceStatus, entryTimeDiff); 

    return res.status(201).json({ message: "Booking created successfully!!", BookingId: savedBooking._id });
  } catch (error) {
    next(error);
  }
};



export const bookingHistory = async (req, res, next) => {
  const { systemId, users, date } = req.query;
  try {
      let filter = {};

      if (systemId && systemId.trim() !== "") {
          filter.systemId = systemId;
      }

    
      // If date is provided, calculate the start and end of the day in UTC
      if (date && date.trim() !== "") {
          const searchDate = new Date(date);
          const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));  // 00:00:00 UTC
          const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));  // 23:59:59.999 UTC

          // Add date range filter to the query
          filter.$or = [
              { entryTime: { $gte: startOfDay, $lte: endOfDay } },
              { exitTime: { $gte: startOfDay, $lte: endOfDay } }
          ];
      }

      const data = await booking.find(filter).populate({
          path: "users",  // Populate 'users' field with user data
          select: "name"  // Only select 'name' field from the User model
      });

      // Filter data by user's name if users query parameter is provided
      if (users && users.trim() !== "") {
          const filteredData = data.filter(booking => {
              return booking.users.some(user => 
                  user.name.toLowerCase().includes(users.toLowerCase()) // Case-insensitive search
              );
          });

          if (filteredData.length === 0) {
              return next(errorHandler(404, "No bookings found for the specified user name"));
          }

          return res.status(200).json(filteredData);
      }

      // If no filtering by user, proceed with the original data
      if (data.length === 0) {
          return next(errorHandler(404, "Booking not found!!"));
      }

      // Modify the response data to include duration, price, and booking date
      const responseData = data.map(booking => {
          // Calculate duration (in minutes, for example)
          const duration = booking.exitTime && booking.entryTime ? 
              (new Date(booking.exitTime) - new Date(booking.entryTime)) / (1000 * 60) : 0;

          // Assuming 'price' is a field in your booking model
          const price = booking.price || 0; // Default to 0 if not present

          // Assuming 'entryTime' is the booking date
          const bookingDate = booking.entryTime ? new Date(booking.entryTime).toISOString() : null;

          return {
              ...booking.toObject(), // Convert Mongoose document to plain object
              duration,  // Duration in minutes 
              price,     // Price of the booking
              bookingDate // Date of booking
          };
      });

      return res.status(200).json(responseData);
  } catch (error) {
      next(error);
  }
};




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

  // Check if the device is already booked during the requested time slot
  const overlappingBookings = await booking.find({
    systemId,
    $or: [
      { entryTime: { $lte: req.body.exitTime }, exitTime: { $gte: req.body.entryTime } }
    ]
  });

  if (overlappingBookings.length > 0) {
    return next(errorHandler(400, "Device is already booked for this time slot"));
  }

  // Check if one group can book only one device at a time
  const multidevice = await booking.find({
    users: { $in: req.body.users },
    $or: [
      { entryTime: { $lte: req.body.exitTime }, exitTime: { $gte: req.body.entryTime } }
    ]
  });

  if (multidevice.length > 0) {
    return next(errorHandler(400, "One group can book one device at a time!!"));
  }

  // Create a new booking
  const newBooking = new booking({ groupName, systemId, users, entryTime, exitTime });

  try {
    const savedBooking = await newBooking.save();

    const st = new Date(req.body.entryTime);
    const end = new Date(req.body.exitTime);
    const duration = end - st; // Duration in milliseconds

    async function updateDeviceStatus() {
      // Update device status when the booking starts
      await device.updateOne({ systemId }, { $set: { isAvailable: false } });
      console.log(`Device ${systemId} booked and status updated to unavailable.`);

      // Schedule to reset device status after the booking duration ends
      setTimeout(async () => {
        await device.updateOne({ systemId }, { $set: { isAvailable: true } });
        console.log(`Device ${systemId} is now available.`);
      }, duration); // Duration in milliseconds (after booking ends)
    }

    // Schedule the status update to occur at booking entry time
    const entryTimeDiff = st.getTime() - new Date().getTime();
    setTimeout(updateDeviceStatus, entryTimeDiff); // Update device status when booking starts

    return res.status(201).json({ message: "Booking created successfully!!", BookingId: savedBooking._id });
  } catch (error) {
    next(error);
  }
};

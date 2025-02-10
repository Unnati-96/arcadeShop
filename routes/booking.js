import express from "express";
import { roleCheck, verifyUser } from "../utils/verify.js";
import { bookingHistory, createBooking } from "../controllers/booking.js";


const router = express.Router();

router.post("/create",verifyUser,roleCheck(["Admin","GuestAdmin"]),createBooking);
router.get("/history",verifyUser,roleCheck("Admin"),bookingHistory);
export default router;
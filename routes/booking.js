import express from "express";
import { verifyUser } from "../utils/verify.js";
import { createBooking } from "../controllers/booking.js";

const router = express.Router();

router.post("/create",verifyUser,createBooking);
export default router;
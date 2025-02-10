import express from 'express';
import { generateBill, getBill } from "../controllers/billing.js";
import { roleCheck, verifyUser } from '../utils/verify.js';

const router = express.Router();
router.post("/generatebill",verifyUser,roleCheck(["Admin","GuestAdmin"]),generateBill);
router.get("/getbill",verifyUser,roleCheck("Admin"),getBill);
export default router;
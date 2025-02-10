import express from "express";
import { roleCheck, verifyUser } from "../utils/verify.js";
import { addDevice, delDevice,  searchDevice, updateDevice } from "../controllers/device.js";

const router = express.Router();

router.post("/add",verifyUser,roleCheck("Admin"),addDevice);
// router.get("/get",verifyUser,getDevices);
router.put("/update/:id",verifyUser,roleCheck("Admin"),updateDevice);
router.delete("/delete/:id",verifyUser,roleCheck("Admin"),delDevice);
router.get("/search",verifyUser,roleCheck(["Admin","GuestAdmin"]),searchDevice);

export default router;
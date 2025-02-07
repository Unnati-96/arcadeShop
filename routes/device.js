import express from "express";
import { verifyUser } from "../utils/verify.js";
import { addDevice, delDevice, getDevices, searchDevice, updateDevice } from "../controllers/device.js";

const router = express.Router();

router.post("/add",verifyUser,addDevice);
router.get("/get",verifyUser,getDevices);
router.put("/update/:id",verifyUser,updateDevice);
router.delete("/delete/:id",verifyUser,delDevice);
router.get("/search",verifyUser,searchDevice);

export default router;
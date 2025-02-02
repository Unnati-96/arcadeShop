import express from "express";
import { addDevice, delDevice, getDevices, searchDevice, updateDevice } from "../controllers/device.js";

const router = express.Router();

router.post("/add",addDevice);
router.get("/get",getDevices);
router.put("/update/:id",updateDevice);
router.delete("/delete/:id",delDevice);
router.get("/search",searchDevice);

export default router;
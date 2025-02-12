import express from "express";
import { addUser, updateUser, delUser,searchUser } from "../controllers/user.js";
import { roleCheck, verifyUser } from "../utils/verify.js";

const router = express.Router();
router.post("/add",verifyUser,roleCheck(["Admin","GuestAdmin"]),addUser);
// router.get("/get",verifyUser,getUser);
router.put("/update/:id",verifyUser,roleCheck("Admin"),updateUser);
router.delete("/delete/:id",verifyUser,roleCheck("Admin"),delUser);
router.get("/search",verifyUser,roleCheck(["Admin","GuestAdmin"]),searchUser);
 
export default router;

import express from "express";
import { addUser, updateUser, delUser,searchUser } from "../controllers/user.js";
import { verifyUser } from "../utils/verify.js";

const router = express.Router();
router.post("/add",verifyUser,addUser);
// router.get("/get",verifyUser,getUser);
router.put("/update/:id",verifyUser,updateUser);
router.delete("/delete/:id",verifyUser,delUser);
router.get("/search",verifyUser,searchUser);
 
export default router;
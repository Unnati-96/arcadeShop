import express from "express";
import { addUser, getUser,updateUser, delUser,searchUser } from "../controllers/user.js";
import { verifyUser } from "../utils/verify.js";

const router = express.Router();
router.post("/add",verifyUser,addUser);
router.get("/get",getUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",delUser);
router.get("/search",searchUser);
 
export default router;
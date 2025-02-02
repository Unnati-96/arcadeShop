import express from "express";
import { addUser, getUser,updateUser, delUser,searchUser } from "../controllers/user.js";

const router = express.Router();
// router.post("/signup",signupUser);
router.post("/add",addUser);
router.get("/get",getUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",delUser);
router.get("/search",searchUser);
 
export default router;
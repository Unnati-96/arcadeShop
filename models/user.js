import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    phoneNo:
    {
        type:Number,
        required:true,
        unique:true
    },
    role:
    {
        type:String,
        required:true,
        enum:["Admin","GuestAdmin","Guest"],
        default:"Guest"
    },
    password:
    {
        type:String,
        unique:true,
        required:true
    }
},{timestamps:true});

const userModel = mongoose.model("user",userSchema);
export default userModel;
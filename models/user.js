import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    // _id:{
    //     type:mongoose.Schema.Types.ObjectId
    // },
    name:{
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/]
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
        required:true
    }
},{timestamps:true});

const user = mongoose.model("user",userSchema);
export default user;
import mongoose from "mongoose";
import user from "./user.js";

const billSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"booking",
        required:true,
    },
    systemId :{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    date:
    {
        type:String,
    },
    billedBy:{
     type:String,
    },
    rate:{
        type:Number
    },
    duration:
    {
        type:Number
    }, 
    groupName:
    {
        type:String
    },
    
}) ;
const billModel = mongoose.model("bill",billSchema);
export default billModel;
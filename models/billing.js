import mongoose from "mongoose";

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
        type:String
    }
    
}) ;
const billModel = mongoose.model("bill",billSchema);
export default billModel;
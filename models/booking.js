import mongoose from"mongoose";

const bookingSchema = new mongoose.Schema({
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }],
    deviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"device",
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
},{timestamps:true});

const bookingModel = mongoose.model("booking",bookingSchema);
export default bookingModel;

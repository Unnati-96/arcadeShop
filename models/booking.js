import mongoose from"mongoose";

const bookingSchema = new mongoose.Schema({
    groupName:{
        type:String,
        required:true
    },
    systemId:
    {
        type:String,
        ref:"device",
        required:true
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    //    index:{ unique:true}
        
    }],
    // deviceId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"device",
    //     required:true, 
        
    // },
    // duration:{
    //     type:Number,
    //     required:true
    // },
    entryTime:{
        type:Date
    }, 
    exitTime:
    { 
        type:Date
    }

},{timestamps:true});

const booking = mongoose.model("booking",bookingSchema);
export default booking;

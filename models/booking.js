// import mongoose from"mongoose";
// import user from './user.js'
// const bookingSchema = new mongoose.Schema({
//     groupName:{
//         type:String,
//         required:true
//     },
//     systemId:
//     {
//         type:String,
//         ref:"device",
//         required:true
//     },
//     users:[{
//         // type:mongoose.Schema.Types.ObjectId,
//         // // ref:"user",
//         // required:true,
//         type: user.schema,
//         // ref: "user",
//         required: true
        
//     }],
//     entryTime:{
//         type:Date
//     }, 
//     exitTime:
//     { 
//         type:Date
//     }

// },{timestamps:true});

// const booking = mongoose.model("booking",bookingSchema);
// export default booking;

//   // deviceId:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:"device",
//     //     required:true, 
        
//     // },
//     // duration:{
//     //     type:Number,
//     //     required:true
//     // },



import mongoose from"mongoose";
// import user from "./user.js";
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
    }],
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
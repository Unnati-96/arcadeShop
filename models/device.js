// import mongoose from "mongoose";

// const deviceSchema = new mongoose.Schema({
//     systemId:
//     {
//         type:String,
//         required:true,
//         unique:true
//     },
//     deviceType:{
//         type:String,
//         required:true
//     },
//     description:
//     {
//         type:String,
//         required:false
//     },
//     pricePerHour :
//     {
//         type:Number,
//         required:true
//     },
//     isAvailable:
//     {
//         type:Boolean,
//         required:true
//     }
// },{timestamps:true});
// const device = mongoose.model("device",deviceSchema);
// export default device;





import mongoose from "mongoose";
const deviceSchema = new mongoose.Schema({
    systemId:
    {
        type:String,
        required:true,
        unique:true
    },
    deviceType:{
        type:String,
        required:true
    },
    description:
    {
        type:String,
        required:false
    },
    pricePerHour :
    {
        type:Number,
        required:true
    },
    isAvailable:
    {
        type:Boolean,
        required:true
    }
},{timestamps:true});
const device = mongoose.model("device",deviceSchema);
export default device;
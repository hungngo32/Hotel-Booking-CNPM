import mongoose from "mongoose";
const BillSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    UserID: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    bill: [{ hotel: String, room: { type: [Number] }, id: { type: [String] }, Date: { type: [Date] } }]
},
    {
        timestamps: true
    }
);
export default mongoose.model("Bill", BillSchema)
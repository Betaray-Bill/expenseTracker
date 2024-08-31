import mongoose from "mongoose";


const incomeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Income = mongoose.model('Income', incomeSchema);
export default Income;
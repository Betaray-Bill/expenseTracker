import mongoose from "mongoose";


const expenseSchema = mongoose.Schema({
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


const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
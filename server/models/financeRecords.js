import mongoose from "mongoose";


const financeRecord = mongoose.Schema({
    income: {
        data: [{
            type: mongoose.Types.ObjectId,
            ref: 'Income',
        }],
        totalIncome: {
            type: Number,
            default: 0
        }
    },
    expense: {
        data: [{
            type: mongoose.Types.ObjectId,
            ref: 'Expense',
        }],
        totalExpense: {
            type: Number,
            default: 0
        }
    },
})

const FinanceRecords = mongoose.model('FinanceRecords', financeRecord);
export default FinanceRecords;
import Expense from "../models/expenseModel.js";

// GET ALL EXPENSE RECORDS
const getAllRecords = async(req, res) => {

    const { id } = req.params;

    const userExpense = await User.findById(id);
    console.log(userExpense.expense)
    let expenseRecords = []
    for (let i = 0; i < userExpense.expense.length; i++) {
        let expenseRecord = await Expense.findById(userExpense.expense[i]).sort({ date });
        expenseRecords.push(expenseRecord)
    }
    console.log(expenseRecords)

    try {
        let filter = {};
        // Filter Month Wise
        if (req.query.month && req.query.year) {
            const startDate = new Date(Date.UTC(req.query.year, req.query.month - 1, 1)); // Start of the month
            const endDate = new Date(Date.UTC(req.query.year, req.query.month, 1)); // Start of the next month
            console.log(startDate, endDate)
            filter = {
                date: {
                    $gte: startDate, // Greater than or equal to start date
                    $lt: endDate // Less than end date (start of the next month)
                }
            };
        }

        console.log("FILTER:  FINAL,", filter)

        const expenseRecord = await Expense.find(filter);
        res.json({
            expenseRecord,
            message: "Success"
        })
    } catch (err) {
        res.status(500).json("Server Error")
    }
}


// ADD EXPENSE
const addExpense = async(req, res) => {
    console.log(req.body);

    const {
        name,
        amount,
        date,
        category
    } = req.body;

    console.log(req.body);

    if (!name || !amount || !category || !date) {
        res.status(500).json("Enter All data")
    }

    try {

        const expenseRecord = await Expense.create({
            name,
            amount,
            date,
            category
        })

        await expenseRecord.save()
        console.log(expenseRecord)

        // Add Expense To the Finance Record


        res.status(200).json({
            expenseRecord,
            message: "Success"
        });

    } catch (err) {
        res.status(401);
        throw new Error(err.message);
    }
}



export {
    addExpense,
    getAllRecords
}
import moment from "moment";
import Income from "../models/incomeExpense.js";
import User from "../models/userModel.js";


// GET ALL INCOME RECORDS
const getAllRecords = async(req, res) => {

    const { id } = req.params;

    const userIncome = await User.findById(id);
    console.log(userIncome.income)
    let incomeRecords = []
    for (let i = 0; i < userIncome.income.length; i++) {
        let incomeRecord = await Income.findById(userIncome.income[i]).sort({ date });
        incomeRecords.push(incomeRecord)
    }
    console.log(incomeRecords)
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

        res.json({
            incomeRecords,
            message: "Success"
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json("Server Error")
    }
}


// ADD INCOME
const addIncome = async(req, res) => {
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
        const formatDate = moment(date).format('DD/MM/YYYY')
        console.log(formatDate)
        const incomeRecords = await Income.create({
            name,
            amount,
            date: formatDate,
            category
        })

        await incomeRecords.save()
        console.log(incomeRecords)

        // Add Income To the Personal Finance Record
        const user = await User.findById(req.user.id)
        console.log(user)

        await user.income.push(incomeRecords._id)
        user.totalIncome = user.totalIncome + incomeRecords.amount
        await user.save()

        res.status(200).json({
            incomeRecords,
            user,
            message: "Success"
        });

    } catch (err) {
        res.status(401);
        throw new Error(err.message);
    }
}



export {
    addIncome,
    getAllRecords
}
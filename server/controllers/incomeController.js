import Income from "../models/incomeExpense.js";


// GET ALL INCOME RECORDS
const getAllRecords = async(req, res) => {

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

        const incomeRecords = await Income.find(filter);
        res.json({
            incomeRecords,
            message: "Success"
        })
    } catch (err) {
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

        const incomeRecords = await Income.create({
            name,
            amount,
            date,
            category
        })

        await incomeRecords.save()
        console.log(incomeRecords)

        // Add Income To the Finance Record


        res.status(200).json({
            incomeRecords,
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
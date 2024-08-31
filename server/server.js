import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import incomeRoutes from "./routes/incomeRoute.js"
import expenseRoutes from "./routes/expenseRoutes.js"
dotenv.config()

const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json())


// CONNECTING DB
try {
    const connectDB = async() => {
        var uri = "mongodb://surya:80kVlt5XpdiHhEvt@cluster0-shard-00-00.3huyd.mongodb.net:27017,cluster0-shard-00-01.3huyd.mongodb.net:27017,cluster0-shard-00-02.3huyd.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nqjjc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(uri);
        console.log("asdA ", mongoose.connection.host, mongoose.connection.port)
    }
    connectDB()
    console.log("CONNECTING")
} catch (e) {
    console.log(e)
    console.log("DB NOT CONNECTED")
}

app.get("/", (req, res) => {
    res.send("Hi There!!")
})

app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
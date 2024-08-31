import mongoose from "mongoose";

const connectDB = async() => {
    console.log("0")
    var uri = "mongodb://surya:80kVlt5XpdiHhEvt@cluster0-shard-00-00.3huyd.mongodb.net:27017,cluster0-shard-00-01.3huyd.mongodb.net:27017,cluster0-shard-00-02.3huyd.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nqjjc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(uri);
    console.log("asdA ", mongoose.connection.host, mongoose.connection.port)
}
export default connectDB
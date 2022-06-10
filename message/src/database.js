import mongoose from "mongoose";
import 'dotenv/config' 

console.log("env database", process.env.MONGO_MESSAGE)

const server = `${process.env.MONGO_MESSAGE}:27017`;

const database = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

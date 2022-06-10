import mongoose from "mongoose";
import 'dotenv/config' 

console.log("env database", process.env.MONGO_CREDIT)

const server = `${process.env.MONGO_CREDIT}:27017`;

const database = "cabify_bootcamp_credit";

console.log(server, database)

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

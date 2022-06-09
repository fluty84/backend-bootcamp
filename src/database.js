import mongoose from "mongoose";
import 'dotenv/config' 

console.log("env database", process.env.SERVER)

const server = `${process.env.SERVER}:27017`;

const database = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

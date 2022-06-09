import mongoose from "mongoose";
import 'dotenv/config' 

console.log("env database", process.env.SERVER)

const server = `${process.env.MONGO_CREDIT}:27018`;

const database = "cabify_bootcamp_credit";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

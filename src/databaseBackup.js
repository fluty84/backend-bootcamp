import mongoose from "mongoose";
import 'dotenv/config'

console.log("env backup", process.env.BACKUPSERVER)

const server = process.env.BACKUPSERVER;

const database = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

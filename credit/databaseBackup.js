import mongoose from "mongoose";
import 'dotenv/config'

const server = process.env.BACKUP_CREDIT;

const database = "cabify_bootcamp_credit_backup";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

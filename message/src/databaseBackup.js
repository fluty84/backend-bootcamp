import mongoose from "mongoose";
import 'dotenv/config'

const server = process.env.REPLICA_MESSAGE;

const database = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

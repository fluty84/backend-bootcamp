import mongoose from "mongoose";

//const server = "mongobackup:27018";
const server = "localhost:27018";

const database = "cabify_bootcamp_backup";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

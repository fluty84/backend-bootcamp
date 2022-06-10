import mongoose from "mongoose"
import database from "../database.js"
import databaseBackup from "../databaseBackup.js"


const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  taskId: String, 
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT", "PENDING", "CHECKING BALANCE", "Not enough money"],
  },
}, {timestamps: true});

const Message = database.model("Message", messageSchema);
const MessageBackup = databaseBackup.model("MessageBackup", messageSchema)

Message.syncIndexes()
MessageBackup.syncIndexes()

export { Message , MessageBackup }

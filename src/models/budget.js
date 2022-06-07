import mongoose from "mongoose";
import database from "../database.js";
import databaseBackup from "../databaseBackup.js";

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  }
})

const Budget = database.model("Budget", budgetSchema)
const BackupBudget = databaseBackup.model("BudgetBackup", budgetSchema)

export {Budget, BackupBudget}

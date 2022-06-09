import mongoose from "mongoose";
import database from "../database.js";
import databaseBackup from "../databaseBackup.js";

const budgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  }   
},
    {
        timestamps: true,
    }
)



const Budget = database.model("Budget", budgetSchema)
const BackupBudget = databaseBackup.model("BudgetBackup", budgetSchema)

Budget.syncIndexes()
BackupBudget.syncIndexes()


export {Budget, BackupBudget}

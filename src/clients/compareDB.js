import { Budget, BackupBudget } from "../models/budget.js"
import { Message, MessageBackup } from "../models/message.js"

import checkBackup from "./checkBackup.js"
import checkBudget from "./checkBudget.js"
import getMesseges from "./getMessages.js"


export default async ({}) => { 


    const masterDB = await checkBudget()
    const backupBudget = await checkBackup()

    const messages = await getMesseges()
    const backupMesseges = await MessageBackup.find()



    console.log(masterDB, "el master", backupBudget, "el backup")

}
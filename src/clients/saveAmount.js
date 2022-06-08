import {Budget, BackupBudget} from "../models/budget.js"
import checkBudget from "./checkBudget.js"
import compareDB from "./compareDB.js"

export default async (number) => {

    let actualMoney = await checkBudget()

    let passMoney = actualMoney ?  actualMoney.amount :  0

    try {
        console.log(actualMoney, "actual money")

        if (actualMoney) {

            actualMoney.amount = actualMoney.amount + number

            if(actualMoney.amount <= 0){
            
                return "Please Top Up to send a message"
            }

            const response = await actualMoney.save()
            
            await BackupBudget.findOneAndUpdate({ amount:response.amount })
        

        return response

        } else {

           const response = await Budget.create({ amount: number })
           await BackupBudget.create({amount:response.amount}) 
                
           return response
        }

    } catch (err) {
        await Budget.findOneAndUpdate({},{amount:passMoney})
        console.log("error saving", err)
    }

}
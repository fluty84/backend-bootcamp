import {Budget, BackupBudget} from "../models/budget.js"
import checkBudget from "../clients/checkBudget.js"

export default async (number) => {

    let actualMoney = await checkBudget()

    let passMoney = actualMoney ?  actualMoney.amount :  0

    if(actualMoney === null){return `error actualmoney is ${actualMoney}`}

    try {
        console.log(actualMoney.amount, "actual money", number, "number")

        if (actualMoney) {

            actualMoney.amount = actualMoney.amount + number

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
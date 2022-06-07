import Budget from "../models/budget.js";
import checkBudget from "./checkBudget.js";


export default async (number) => {

    let actualMoney = await checkBudget()

    try {
        console.log(actualMoney, "actual money")

        if (actualMoney) {

            actualMoney.amount = actualMoney.amount + number

            const sum = await actualMoney.save()

            return sum

        } else {

           const sum = await Budget.create({ amount: number })
        
           return sum
        }

    } catch (err) {
        console.log("error saving", err)
    }
}
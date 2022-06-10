import changeBudgetBy from "../controllers/changeBudgetBy.js"
import checkBudget from "../clients/checkBudget.js"


export const hasMoney = async (message, MESSAGE_PRICE) => {
    const actualMoney = await checkBudget()

    console.log(actualMoney, "moneeeeey on chekers")

    if (actualMoney.amount > MESSAGE_PRICE - 1) {

        message.status = "OK"
        changeBudgetBy(-MESSAGE_PRICE)
        
        return message

    } else {
        
        message.status = "Not enough money"

        return message
    }
}
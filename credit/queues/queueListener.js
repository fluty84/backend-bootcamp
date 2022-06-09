import Queue from "bull";
import http from "http"
import checkBudget from "../src/clients/checkBudget.js"
import changeBudgetBy from "../src/clients/changeBudgetBy.js"
import queueWorker from "./queueWorker.js";
import { hasMoney } from "../utils/checkers.js";

const MESSAGE_PRICE = 2

const fromMessage = new Queue("creditQueue", {
    redis: { host: "localhost", port: 6379 }
})

const toMessage = new Queue("listenCredit", {
    redis: { host: "localhost", port: 6379 }
})
export default (task, taskId) => {

    //taskId && console.log("Processing on credit queue with id: ", taskId)

    const main = async () => {
        await toMessage.add(task, {
            attemps: 4,
            backoff: 5000
        })
    }

    fromMessage.process(async (job, done) => {
        console.log("process on credit job.data")
        toMessage.add(await hasMoney(job.data, MESSAGE_PRICE))
        done()
    })

    main().catch(console.error)

}


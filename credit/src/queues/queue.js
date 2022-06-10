import Queue from "bull";
import http from "http"
import { hasMoney } from "../utils/checkers.js";
import "dotenv/config"

export default (task, taskId) => {

    const MESSAGE_PRICE = 2

    const fromMessage = new Queue("creditQueue", {
        redis: { host: process.env.REDISDOKER, port: 6379 }
    })

    const toMessage = new Queue("listenCredit", {
        redis: { host: process.env.REDISDOKER, port: 6379 }
    })

    taskId && console.log("Processing on credit queue with id: ", taskId)

    const main = async () => {
        await toMessage.add(task, {
            attemps: 4,
            backoff: 5000
        })
    }

    fromMessage.process(async (job, done) => {
     
        toMessage.add(await hasMoney(job.data, MESSAGE_PRICE))
        done()
    })

    main().catch(console.error)

}


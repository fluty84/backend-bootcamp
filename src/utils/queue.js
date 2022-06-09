import Queue from "bull";
import http from "http"
import saveMessage from "../clients/saveMessage.js"
import checkBudget from "../clients/checkBudget.js"
import changeBudgetBy from "../clients/changeBudgetBy.js"

export default (task, taskId) => {

   taskId && console.log("Processing on queue with id: ", taskId)

    const queue = new Queue("myQueue", {
        redis: { host: "localhost", port: 6379 }
    });

    const main = async () => {
        await queue.add(task,{
            attemps: 4,
            backoff:5000
        })     
    }

    queue.process((job, done) => {
        job
        done()
    })

    main().catch(console.error)

}
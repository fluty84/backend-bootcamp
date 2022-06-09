import Queue from "bull";
import http from "http"
import checkBudget from "../src/clients/checkBudget.js"
import changeBudgetBy from "../src/clients/changeBudgetBy.js"



 const queue = new Queue("creditQueue", {
     redis: { host: "localhost", port: 6379 }
 });
export default (task) => {

    queue.on('completed', (job, result) => {
        console.log(`${job} completed with result ${result}`);
    })

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
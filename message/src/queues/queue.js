import Queue from "bull";
import http from "http"
import sendMessage from "../controllers/sendMessage.js";

const toCredit = new Queue("creditQueue", {
    redis: { host: "localhost", port: 6379 }
});

const fromCredit = new Queue("listenCredit", {
    redis: { host: "localhost", port: 6379 }
});

const saveMessageQ = new Queue("saveMessage", {
    redis: { host: "localhost", port: 6379 }
});

export default (task, taskId) => {

   taskId && console.log("Processing on queue with id: ", taskId)


    const main = async () => {
        await toCredit.add(task,{
            attemps: 4,
            backoff:5000
        }) 
        
    }

    fromCredit.process(async (job, done) => {
        saveMessageQ.add(await sendMessage(job.data))
        done()
    })

    saveMessageQ.process((job, done) => {    
        console.log(job)
        done()
    })


    main().catch(console.error)

}
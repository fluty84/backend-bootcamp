import Queue from "bull"
import sendMessage from "../controllers/sendMessage.js"
import 'dotenv/config' 

export default (task, taskId) => {

    const toCredit = new Queue("creditQueue", {
        redis: { host: process.env.REDISDOKER, port: 6379 }
    })

    const fromCredit = new Queue("listenCredit", {
        redis: { host: process.env.REDISDOKER, port: 6379 }
    })

    const saveMessageQ = new Queue("saveMessage", {
        redis: { host: process.env.REDISDOKER, port: 6379 }
    })


    taskId && console.log("Processing on queue with id: ", taskId)


    const main = async () => {
        await toCredit.add(task, {
            attemps: 4,
            backoff: 5000
        })

    }

    fromCredit.process(async (job, done) => {
        saveMessageQ.add(await sendMessage(job.data))
        done()
    })

    saveMessageQ.process((job, done) => {
        done()
    })

  
    main().catch(console.error)

}
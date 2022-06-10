import saveMessage from "../clients/saveMessage.js"
import 'dotenv/config'
import uniqid from 'uniqid'
import queue from "../queues/queue.js"


export default async (req, res) => {

    const body = JSON.stringify(req.body)

    const taskId = uniqid() ///Creates an ID to bound tasks status

    let message

    try {
         message = await saveMessage({
            ...req.body,
            status: "CHECKING BALANCE",
            taskId
        })
    }
    catch (error) {
        return res.status(500).json("Error saving message", error)
    }

    queue(message, taskId)

    res.status(200).json("Message Sent")
}
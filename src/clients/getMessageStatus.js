
import { response } from "express"
import { Message } from "../models/message.js"

export default (req, res) => {
    
    const { messageId } = req.params 

    console.log(messageId)

    Message
        .find({taskId:messageId}, "status")
        .then( response => res.json(response))

}